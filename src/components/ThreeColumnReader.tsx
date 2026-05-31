import { useState, useRef } from 'react'
import { Highlighter, MessageSquare, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useBookStore } from '@/stores/bookStore'
import type { Annotation, Highlight } from '@/types'

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', color: '#FFEB3B', bgClass: 'bg-yellow-200' },
  { name: 'Green', color: '#8BC34A', bgClass: 'bg-green-200' },
  { name: 'Blue', color: '#2196F3', bgClass: 'bg-blue-200' },
  { name: 'Purple', color: '#9C27B0', bgClass: 'bg-purple-200' },
]

export default function ThreeColumnReader() {
  const { readingBook, currentParsedChapterId, setCurrentParsedChapter, addAnnotation, removeAnnotation, addHighlight, removeHighlight } = useBookStore()
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [selectedText, setSelectedText] = useState('')
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const [annotationNote, setAnnotationNote] = useState('')
  const [selectedColor, setSelectedColor] = useState(HIGHLIGHT_COLORS[0])
  const contentRef = useRef<HTMLDivElement>(null)

  if (!readingBook) {
    return (
      <div className="flex h-full items-center justify-center text-leather-400">
        <p>请从书架中选择一本图书开始阅读</p>
      </div>
    )
  }

  const currentChapter = readingBook.parsedChapters?.find(c => c.id === currentParsedChapterId)
  const chapterText = currentChapter && readingBook.contentText 
    ? readingBook.contentText.slice(currentChapter.startIndex, currentChapter.endIndex)
    : readingBook.contentText || ''

  const handleTextSelection = () => {
    try {
      const selection = window.getSelection()
      if (!selection || selection.toString().trim().length === 0 || !contentRef.current?.contains(selection.anchorNode)) {
        return
      }
      const range = selection.getRangeAt(0)
      const textContent = contentRef.current.textContent || ''
      
      const rangeText = range.toString()
      const start = textContent.indexOf(rangeText)
      
      if (start !== -1) {
        setSelectedText(rangeText)
        setSelectionRange({ start, end: start + rangeText.length })
        setShowToolbar(true)
      }
    } catch {
      // ignore selection errors
    }
  }

  const applyHighlight = () => {
    if (!selectionRange || !currentChapter) return
    
    const highlight: Highlight = {
      id: `highlight-${Date.now()}`,
      bookId: readingBook.id,
      chapterId: currentChapter.id,
      startOffset: selectionRange.start,
      endOffset: selectionRange.end,
      color: selectedColor.color,
    }
    
    addHighlight(highlight)
    resetSelection()
  }

  const applyAnnotation = () => {
    if (!selectionRange || !currentChapter || !annotationNote.trim()) return
    
    const annotation: Annotation = {
      id: `annotation-${Date.now()}`,
      bookId: readingBook.id,
      chapterId: currentChapter.id,
      text: selectedText,
      startOffset: selectionRange.start,
      endOffset: selectionRange.end,
      color: selectedColor.color,
      note: annotationNote,
      createdAt: new Date(),
    }
    
    addAnnotation(annotation)
    resetSelection()
  }

  const resetSelection = () => {
    setSelectedText('')
    setSelectionRange(null)
    setShowToolbar(false)
    setAnnotationNote('')
    window.getSelection()?.removeAllRanges()
  }

  const renderTextWithHighlights = () => {
    if (!chapterText) return <p className="text-leather-400 italic">暂无文本内容</p>
    
    const highlights = (readingBook.highlights || [])
      .filter(h => h.chapterId === currentChapter?.id)
      .sort((a, b) => a.startOffset - b.startOffset)
    
    const annotations = (readingBook.annotations || [])
      .filter(a => a.chapterId === currentChapter?.id)
      .sort((a, b) => a.startOffset - b.startOffset)

    const allMarkers = [...highlights, ...annotations].sort((a, b) => 
      'startOffset' in a && 'startOffset' in b ? a.startOffset - b.startOffset : 0
    )

    if (allMarkers.length === 0) {
      return <p className="whitespace-pre-wrap leading-relaxed">{chapterText}</p>
    }

    const elements: React.ReactNode[] = []
    let lastIndex = 0

    allMarkers.forEach((marker, index) => {
      const isHighlight = 'color' in marker && !('note' in marker)
      const isAnnotation = 'note' in marker
      
      const start = 'startOffset' in marker ? marker.startOffset : 0
      const end = 'endOffset' in marker ? marker.endOffset : 0

      if (start > lastIndex) {
        elements.push(<span key={`text-${index}`}>{chapterText.slice(lastIndex, start)}</span>)
      }

      const colorInfo = HIGHLIGHT_COLORS.find(c => c.color === ('color' in marker ? marker.color : '')) || HIGHLIGHT_COLORS[0]
      
      elements.push(
        <mark 
          key={isHighlight ? `hl-${marker.id}` : `ann-${(marker as any).id}`}
          className={`${colorInfo.bgClass} rounded px-1 cursor-pointer hover:opacity-80`}
          onClick={() => isAnnotation && console.log('Jump to annotation:', marker)}
        >
          {chapterText.slice(start, end)}
        </mark>
      )

      lastIndex = end
    })

    if (lastIndex < chapterText.length) {
      elements.push(<span key="text-final">{chapterText.slice(lastIndex)}</span>)
    }

    return <p className="whitespace-pre-wrap leading-relaxed">{elements}</p>
  }

  return (
    <div className="flex h-full bg-page-light">
      {/* Left Panel - Bookshelf & Chapters */}
      <div className={`${showLeftPanel ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r border-leather-200 flex flex-col`}>
        {showLeftPanel && (
          <>
            <div className="p-4 border-b border-leather-200">
              <h3 className="font-serif font-semibold text-ink-800">目录</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {readingBook.parsedChapters && readingBook.parsedChapters.length > 0 ? (
                <div className="space-y-2">
                  {readingBook.parsedChapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setCurrentParsedChapter(chapter.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentParsedChapterId === chapter.id
                          ? 'bg-crimson-50 text-crimson-700'
                          : 'text-ink-600 hover:bg-leather-50'
                      }`}
                      style={{ paddingLeft: `${(chapter.level || 1) * 12}px` }}
                    >
                      {chapter.title}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-leather-400">暂无章节信息</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Toggle Left Panel */}
      <button
        onClick={() => setShowLeftPanel(!showLeftPanel)}
        className="self-center -ml-3 h-12 w-6 bg-white border-y border-r border-leather-200 rounded-r-lg flex items-center justify-center hover:bg-leather-50 transition-colors z-10"
      >
        {showLeftPanel ? <ChevronLeft size={16} className="text-leather-500" /> : <ChevronRight size={16} className="text-leather-500" />}
      </button>

      {/* Center Panel - Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-leather-200 bg-white">
          <h2 className="font-serif text-lg font-semibold text-ink-800">{readingBook.title}</h2>
          {currentChapter && <p className="text-sm text-leather-500 mt-1">{currentChapter.title}</p>}
        </div>
        
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto p-8"
          onMouseUp={handleTextSelection}
        >
          {showToolbar && (
            <div className="sticky top-0 z-20 mb-4 p-3 bg-white border border-leather-200 rounded-lg shadow-lg flex items-center gap-3">
              <span className="text-sm text-ink-600 font-medium">高亮颜色：</span>
              {HIGHLIGHT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${color.bgClass} ${
                    selectedColor.color === color.color ? 'border-ink-800' : 'border-transparent'
                  }`}
                />
              ))}
              <div className="h-6 w-px bg-leather-200 mx-2" />
              <button
                onClick={applyHighlight}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-leather-100 text-ink-700 hover:bg-leather-200 transition-colors text-sm"
              >
                <Highlighter size={16} />
                <span>高亮</span>
              </button>
              <button
                onClick={() => {
                  if (annotationNote.trim()) {
                    applyAnnotation()
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-crimson-100 text-crimson-700 hover:bg-crimson-200 transition-colors text-sm"
              >
                <MessageSquare size={16} />
                <span>添加批注</span>
              </button>
              <input
                type="text"
                value={annotationNote}
                onChange={(e) => setAnnotationNote(e.target.value)}
                placeholder="输入批注内容..."
                className="flex-1 px-3 py-1.5 border border-leather-200 rounded-lg text-sm"
              />
              <button
                onClick={resetSelection}
                className="px-3 py-1.5 text-leather-500 hover:text-ink-700"
              >
                取消
              </button>
            </div>
          )}
          
          <div className="max-w-3xl mx-auto">
            {renderTextWithHighlights()}
          </div>
        </div>
      </div>

      {/* Toggle Right Panel */}
      <button
        onClick={() => setShowRightPanel(!showRightPanel)}
        className="self-center -mr-3 h-12 w-6 bg-white border-y border-l border-leather-200 rounded-l-lg flex items-center justify-center hover:bg-leather-50 transition-colors z-10"
      >
        {showRightPanel ? <ChevronRight size={16} className="text-leather-500" /> : <ChevronLeft size={16} className="text-leather-500" />}
      </button>

      {/* Right Panel - Annotations */}
      <div className={`${showRightPanel ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-l border-leather-200 flex flex-col`}>
        {showRightPanel && (
          <>
            <div className="p-4 border-b border-leather-200">
              <h3 className="font-serif font-semibold text-ink-800 flex items-center gap-2">
                <MessageSquare size={18} />
                我的批注
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {(readingBook.annotations || []).length > 0 ? (
                <div className="space-y-4">
                  {(readingBook.annotations || []).map((annotation) => {
                    const colorInfo = HIGHLIGHT_COLORS.find(c => c.color === annotation.color) || HIGHLIGHT_COLORS[0]
                    return (
                      <div 
                        key={annotation.id}
                        className="p-3 border border-leather-200 rounded-lg bg-leather-50/30"
                      >
                        <div className={`${colorInfo.bgClass} text-ink-800 text-sm p-2 rounded mb-2`}>
                          "{annotation.text}"
                        </div>
                        <p className="text-sm text-ink-700 mb-2">{annotation.note}</p>
                        <div className="flex items-center justify-between text-xs text-leather-400">
                          <span>{new Date(annotation.createdAt).toLocaleDateString('zh-CN')}</span>
                          <button
                            onClick={() => removeAnnotation(annotation.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-leather-400">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">选中文本添加批注</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
