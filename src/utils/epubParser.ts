import JSZip from 'jszip'
import { parseChapters } from './chapterParser'
import type { ParsedChapter } from '../types'

interface EpubResult {
  contentText: string
  parsedChapters: ParsedChapter[]
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

function parseOpf(opfContent: string, basePath: string) {
  const hrefs: string[] = []
  
  // Find spine items
  const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/i)
  if (!spineMatch) return hrefs
  
  const idRefs: string[] = []
  const itemrefRegex = /<itemref[^>]+idref="([^"]+)"/gi
  let idMatch
  while ((idMatch = itemrefRegex.exec(spineMatch[1])) !== null) {
    idRefs.push(idMatch[1])
  }
  
  // Find manifest items
  const manifestMatch = opfContent.match(/<manifest[^>]*>([\s\S]*?)<\/manifest>/i)
  if (!manifestMatch) return hrefs
  
  const itemMap: Record<string, string> = {}
  const itemRegex = /<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"/gi
  let itemMatch
  while ((itemMatch = itemRegex.exec(manifestMatch[1])) !== null) {
    const itemId = itemMatch[1]
    const href = itemMatch[2]
    itemMap[itemId] = href
  }
  
  for (const idRef of idRefs) {
    if (itemMap[idRef]) {
      hrefs.push(basePath + itemMap[idRef])
    }
  }
  
  return hrefs
}

export async function parseEpub(arrayBuffer: ArrayBuffer): Promise<EpubResult> {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer)
    
    // Read container.xml
    const containerFile = zip.file('META-INF/container.xml')
    if (!containerFile) {
      throw new Error('Invalid EPUB: no container.xml')
    }
    const containerXml = await containerFile.async('string')
    
    // Find OPF path from container.xml
    const rootfileMatch = containerXml.match(/full-path="([^"]+)"/i)
    if (!rootfileMatch) {
      throw new Error('Invalid EPUB: no rootfile in container.xml')
    }
    const opfPath = rootfileMatch[1]
    
    // Read OPF file
    const opfFile = zip.file(opfPath)
    if (!opfFile) {
      throw new Error('Invalid EPUB: OPF file not found')
    }
    const opfContent = await opfFile.async('string')
    
    // Determine base path for content files
    const opfDir = opfPath.substring(0, opfPath.lastIndexOf('/') + 1)
    
    // Get ordered content file paths
    const contentFiles = parseOpf(opfContent, opfDir)
    
    if (contentFiles.length === 0) {
      throw new Error('Invalid EPUB: no content files found')
    }
    
    // Read and extract text from each content file
    const chapters: Array<{ title: string; text: string }> = []
    
    for (const filePath of contentFiles) {
      const file = zip.file(filePath)
      if (!file) continue
      
      const html = await file.async('string')
      const text = stripHtml(html)
      if (!text) continue
      
      // Try to extract a title from the first heading
      const titleMatch = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i)
      const title = titleMatch ? titleMatch[1].trim() : `第 ${chapters.length + 1} 章`
      
      chapters.push({ title, text })
    }
    
    if (chapters.length === 0) {
      throw new Error('No text content could be extracted from EPUB')
    }
    
    // Build full text and chapter structure
    const contentText = chapters.map((ch) => ch.text).join('\n\n')
    
    let offset = 0
    const parsedChapters: ParsedChapter[] = chapters.map((ch, i) => {
      const startIndex = offset
      const endIndex = offset + ch.text.length
      offset = endIndex + 2 // account for the '\n\n' separator
      
      return {
        id: `epub-chapter-${i}`,
        title: ch.title,
        level: 1,
        startIndex,
        endIndex
      }
    })
    
    // Also try to parse sub-chapters from the full text
    const defaultParsed = parseChapters(contentText)
    const finalChapters = defaultParsed.length > 1 ? defaultParsed : parsedChapters
    
    return { contentText, parsedChapters: finalChapters }
  } catch (err) {
    console.error('[EPUB Parser] error:', err)
    throw err
  }
}