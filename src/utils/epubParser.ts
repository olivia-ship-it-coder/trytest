import JSZip from 'jszip'
import type { ParsedChapter } from '../types'

interface EpubResult {
  contentText: string
  parsedChapters: ParsedChapter[]
  coverImage?: string
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+/gm, '')
    .trim()
}

function extractTitle(html: string): string | null {
  // Try <title> tag first (usually has full book context)
  const titleTagMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  if (titleTagMatch) {
    const t = titleTagMatch[1].trim()
    if (t) return t
  }
  // Fall back to first heading
  const headingMatch = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i)
  if (headingMatch) {
    return headingMatch[1].trim()
  }
  return null
}

function parseOpf(opfContent: string, basePath: string) {
  const hrefs: string[] = []

  const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/i)
  if (!spineMatch) return { hrefs, coverHref: null as string | null }

  const idRefs: string[] = []
  const itemrefRegex = /<itemref[^>]+idref="([^"]+)"/gi
  let idMatch
  while ((idMatch = itemrefRegex.exec(spineMatch[1])) !== null) {
    idRefs.push(idMatch[1])
  }

  const manifestMatch = opfContent.match(/<manifest[^>]*>([\s\S]*?)<\/manifest>/i)
  if (!manifestMatch) return { hrefs, coverHref: null }

  let coverHref: string | null = null
  const itemMap: Record<string, string> = {}
  const itemRegex = /<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"([^>]*)>/gi
  let itemMatch
  while ((itemMatch = itemRegex.exec(manifestMatch[1])) !== null) {
    const itemId = itemMatch[1]
    const href = itemMatch[2]
    const rest = itemMatch[3] || ''
    itemMap[itemId] = href
    // Detect cover image: id="cover" / id="cover-image" / properties="cover-image"
    if (/cover/i.test(itemId) || /cover-image/i.test(rest)) {
      coverHref = basePath + href
    }
  }

  for (const idRef of idRefs) {
    if (itemMap[idRef]) {
      hrefs.push(basePath + itemMap[idRef])
    }
  }

  return { hrefs, coverHref }
}

async function extractCover(zip: JSZip, coverHref: string | null): Promise<string | undefined> {
  if (!coverHref) return undefined
  const file = zip.file(coverHref)
  if (!file) return undefined
  try {
    const blob = await file.async('blob')
    const ext = coverHref.split('.').pop()?.toLowerCase() || 'jpeg'
    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    }
    const mime = mimeMap[ext] || 'image/jpeg'
    const buffer = await blob.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return `data:${mime};base64,${btoa(binary)}`
  } catch {
    return undefined
  }
}

export async function parseEpub(arrayBuffer: ArrayBuffer): Promise<EpubResult> {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer)

    const containerFile = zip.file('META-INF/container.xml')
    if (!containerFile) {
      throw new Error('Invalid EPUB: no container.xml')
    }
    const containerXml = await containerFile.async('string')

    const rootfileMatch = containerXml.match(/full-path="([^"]+)"/i)
    if (!rootfileMatch) {
      throw new Error('Invalid EPUB: no rootfile in container.xml')
    }
    const opfPath = rootfileMatch[1]

    const opfFile = zip.file(opfPath)
    if (!opfFile) {
      throw new Error('Invalid EPUB: OPF file not found')
    }
    const opfContent = await opfFile.async('string')

    const opfDir = opfPath.substring(0, opfPath.lastIndexOf('/') + 1)

    const { hrefs: contentFiles, coverHref } = parseOpf(opfContent, opfDir)

    if (contentFiles.length === 0) {
      throw new Error('Invalid EPUB: no content files found')
    }

    const coverImage = await extractCover(zip, coverHref)

    const chapters: Array<{ title: string; text: string }> = []

    for (const filePath of contentFiles) {
      const file = zip.file(filePath)
      if (!file) continue

      const html = await file.async('string')
      const text = stripHtml(html)
      if (!text) continue

      const title = extractTitle(html) || `第 ${chapters.length + 1} 章`

      chapters.push({ title, text })
    }

    if (chapters.length === 0) {
      throw new Error('No text content could be extracted from EPUB')
    }

    const contentText = chapters.map((ch) => ch.text).join('\n\n')

    let offset = 0
    const parsedChapters: ParsedChapter[] = chapters.map((ch, i) => {
      const startIndex = offset
      const endIndex = offset + ch.text.length
      offset = endIndex + 2

      return {
        id: `epub-chapter-${i}`,
        title: ch.title,
        level: 1,
        startIndex,
        endIndex,
      }
    })

    return { contentText, parsedChapters, coverImage }
  } catch (err) {
    console.error('[EPUB Parser] error:', err)
    throw err
  }
}