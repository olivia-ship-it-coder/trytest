import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, FileText, Check } from 'lucide-react'
import { useBookStore } from '@/stores/bookStore'
import type { Book } from '@/types'
import { parseChapters } from '@/utils/chapterParser'
import { parseEpub } from '@/utils/epubParser'

const supportedFormats = [
  'pdf', 'epub', 'mobi', 'txt', 'md',
  'rtf', 'doc', 'docx', 'odt'
]

export default function UploadModal() {
  const [dragOver, setDragOver] = useState(false)
  const [uploaded, setUploaded] = useState<{ name: string; size: number } | null>(null)
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { addUploadedBook, setShowUploadModal, setReadingBook } = useBookStore()

  const getFileExtension = (filename: string): string => {
    const lastDot = filename.lastIndexOf('.')
    return lastDot !== -1 ? filename.slice(lastDot + 1).toLowerCase() : ''
  }

  const getCoverColor = (ext: string): string => {
    const colorMap: Record<string, string> = {
      'pdf': '#5C4B3A',
      'epub': '#8B2C0E',
      'mobi': '#2A5545',
      'txt': '#4B5658',
      'md': '#6B4F66',
      'rtf': '#5A6B58',
      'doc': '#2B5C8A',
      'docx': '#1F5C99',
      'odt': '#336699'
    }
    return colorMap[ext] || '#5C4B3A'
  }

  const arrayBufferToBase64 = (buf: ArrayBuffer): string => {
    const bytes = new Uint8Array(buf)
    const chunks: string[] = []
    const chunkSize = 8192
    for (let i = 0; i < bytes.length; i += chunkSize) {
      let binary = ''
      const end = Math.min(i + chunkSize, bytes.length)
      for (let j = i; j < end; j++) {
        binary += String.fromCharCode(bytes[j])
      }
      chunks.push(binary)
    }
    return btoa(chunks.join(''))
  }

  const handleFile = async (file: File) => {
    const ext = getFileExtension(file.name)
    if (!supportedFormats.includes(ext)) return

    setProcessing(true)
    setUploaded({ name: file.name, size: file.size })

    try {
      const arrayBuffer = await file.arrayBuffer()
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        console.error('[Upload] empty file')
        setUploaded(null)
        setProcessing(false)
        return
      }

      const id = `upload-${Date.now()}`
      let contentText = ''
      let parsedChapters: any[] = []
      let fileData = ''
      let coverImage: string | undefined

      if (ext === 'txt' || ext === 'md') {
        contentText = new TextDecoder('utf-8').decode(arrayBuffer)
        console.log('[Upload] decoded text length:', contentText.length, 'ext:', ext)
        if (contentText) {
          parsedChapters = parseChapters(contentText)
          console.log('[Upload] parsed chapters:', parsedChapters.length)
        }
      } else if (ext === 'epub') {
        console.log('[Upload] parsing EPUB...')
        try {
          const epubResult = await parseEpub(arrayBuffer)
          contentText = epubResult.contentText
          parsedChapters = epubResult.parsedChapters
          coverImage = epubResult.coverImage
          console.log('[Upload] EPUB parsed:', { contentTextLen: contentText.length, chapters: parsedChapters.length })
        } catch (epubErr) {
          console.error('[Upload] EPUB parsing failed:', epubErr)
          setUploaded(null)
          setProcessing(false)
          return
        }
      } else {
        // PDF and other binary formats — convert to base64 data URL
        const mimeType = file.type || 'application/octet-stream'
        const base64 = arrayBufferToBase64(arrayBuffer)
        fileData = `data:${mimeType};base64,${base64}`
      }

      const book: Book = {
        id,
        title: file.name.replace(new RegExp(`\\.${ext}$`, 'i'), ''),
        author: '上传图书',
        coverColor: getCoverColor(ext),
        coverImage,
        description: `上传时间：${new Date().toLocaleDateString('zh-CN')}`,
        chapters: [
          { id: `${id}-full`, title: '全文', sections: [] },
        ],
        source: 'upload',
        fileData,
        fileName: file.name,
        fileSize: file.size,
        fileType: ext,
        uploadedAt: Date.now(),
        contentText,
        parsedChapters,
        annotations: [],
        highlights: [],
      }
      console.log('[Upload] book created:', { title: book.title, contentTextLen: contentText.length })
      addUploadedBook(book)
      setReadingBook(book)
      setShowUploadModal(false)
      navigate('/')
    } catch (err) {
      console.error('[Upload] error processing file:', err)
      setUploaded(null)
      setProcessing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setShowUploadModal(false)}
    >
      <div
        className="mx-4 w-full max-w-md rounded-xl bg-page-light shadow-book-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-leather-200 px-5 py-4">
          <h2 className="font-serif text-base font-semibold text-ink-800">上传图书</h2>
          <button
            onClick={() => setShowUploadModal(false)}
            className="rounded-full p-1 text-leather-400 hover:text-leather-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {uploaded ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${processing ? 'bg-leather-100' : 'bg-green-50'}`}>
                {processing ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-leather-400 border-t-transparent" />
                ) : (
                  <Check size={24} className="text-green-600" />
                )}
              </div>
              <div className="text-center">
                <p className="font-serif text-sm font-medium text-ink-800">{uploaded.name}</p>
                <p className="text-xs text-leather-500">{formatSize(uploaded.size)}</p>
              </div>
              <p className={`text-xs ${processing ? 'text-leather-500' : 'text-green-600'}`}>
                {processing ? '正在解析，请稍候...' : '上传成功，正在打开...'}
              </p>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
                dragOver
                  ? 'border-crimson-400 bg-crimson-50/30'
                  : 'border-leather-300 bg-leather-50/30 hover:border-leather-400'
              }`}
            >
              <Upload size={28} className="text-leather-400" />
              <div className="text-center">
                <p className="font-serif text-sm text-ink-700">
                  点击选择文件或拖放文件到此处
                </p>
                <p className="mt-1 text-xs text-leather-400">支持 PDF、EPUB、MOBI、TXT、MD、RTF、DOC、DOCX、ODT</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.epub,.mobi,.txt,.md,.rtf,.doc,.docx,.odt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(file)
                }}
              />
            </div>
          )}

          <div className="mt-4 rounded-lg bg-leather-50/50 p-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-leather-500" />
              <span className="text-xs text-leather-500">
                上传的文件将保存在浏览器本地，可随时在书架中打开阅读
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
