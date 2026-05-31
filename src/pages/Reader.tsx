import { useState, useMemo } from 'react'
import { BookOpen, Lightbulb, Bookmark, ArrowLeft, FileText, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { paragraphs } from '@/data/paragraphs'
import { concepts } from '@/data/concepts'
import { sectionToTranslation } from '@/data/sectionTranslationMap'
import { useBookStore } from '@/stores/bookStore'
import ConceptPanel from '@/components/ConceptPanel'
import ConceptTooltip from '@/components/ConceptTooltip'
import TOCSidebar from '@/components/TOCSidebar'
import TranslationView from '@/components/TranslationView'
import { findConceptMatches } from '@/utils/conceptMarker'
import type { Concept } from '@/types'

export default function Reader() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [activeParagraph, setActiveParagraph] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [hoveredConcept, setHoveredConcept] = useState<Concept | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

  const renderMarkedText = (text: string) => {
    if (!text) return null
    const matches = findConceptMatches(text, concepts)
    if (matches.length === 0) return text

    const nodes: React.ReactNode[] = []
    let lastEnd = 0

    for (const match of matches) {
      if (match.startIndex > lastEnd) {
        nodes.push(text.slice(lastEnd, match.startIndex))
      }
      nodes.push(
        <span
          key={`c-${match.startIndex}`}
          className="cursor-help border-b border-dashed border-crimon-300/50 text-crimson-700 transition-colors duration-150 hover:bg-crimson-50"
          onMouseEnter={(e) => {
            setHoveredConcept(match.concept)
            setMousePos({ x: e.clientX, y: e.clientY })
          }}
          onMouseMove={(e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
          }}
          onMouseLeave={() => {
            setHoveredConcept(null)
            setMousePos(null)
          }}
        >
          {match.concept.name}
        </span>
      )
      lastEnd = match.endIndex
    }

    if (lastEnd < text.length) {
      nodes.push(text.slice(lastEnd))
    }

    return nodes
  }

  const toggleExpanded = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const {
    readingBook,
    currentChapterId,
    currentSectionId,
    currentParsedChapterId,
    showTOC,
    setReadingBook,
    setCurrentSection,
    setCurrentParsedChapter,
    toggleTOC,
  } = useBookStore()

  const paragraphConceptMap = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const p of paragraphs) {
      const names = p.relatedConcepts
        .map((id) => concepts.find((c) => c.id === id))
        .filter(Boolean)
        .map((c) => c!.id)
      map[p.id] = names
    }
    return map
  }, [])

  const currentAnalysis = activeParagraph
    ? paragraphs.find((p) => p.id === activeParagraph)
    : null

  const currentChapter = readingBook?.chapters.find((c) => c.id === currentChapterId)
  const currentSection = currentChapter?.sections.find((s) => s.id === currentSectionId)

  const bookContentWidth = showTOC ? 'ml-64' : 'ml-0'

  // ── 3-level tree: 书籍 → 卷册 → 章节 ──
  interface TOCNode {
    key: string
    label: string
    children: TOCNode[]
    chapterId?: string
  }

  // Parse a chapter title into hierarchical parts
  function parseTitle(title: string): { book?: string; volume?: string; chapter?: string } | null {
    // Book + Volume + Chapter  (e.g. "沉思录 第一卷 第一章")
    const m1 = title.match(/^(.+?)[·\s]*(第[一二三四五六七八九十百千万\d]+[卷部集])[·\s]*(第[一二三四五六七八九十百千万\d]+[章节篇]).*$/i)
    if (m1) return { book: m1[1].trim(), volume: m1[2], chapter: m1[3] }
    // Book + Chapter  (e.g. "沉思录 第一章")
    const m2 = title.match(/^(.+?)[·\s]*(第[一二三四五六七八九十百千万\d]+[章节篇]).*$/i)
    if (m2) return { book: m2[1].trim(), chapter: m2[2] }
    // Book + Volume only  (e.g. "沉思录 第一卷")
    const m3 = title.match(/^(.+?)[·\s]*(第[一二三四五六七八九十百千万\d]+[卷部集]).*$/i)
    if (m3) return { book: m3[1].trim(), volume: m3[2] }
    // Just Chapter  (e.g. "第一章")
    const m4 = title.match(/^(第[一二三四五六七八九十百千万\d]+[章节篇]).*$/i)
    if (m4) return { chapter: m4[1] }
    // Just Volume  (e.g. "第一卷")
    const m5 = title.match(/^(第[一二三四五六七八九十百千万\d]+[卷部集]).*$/i)
    if (m5) return { volume: m5[1] }
    // Book only (no recognizable suffix)
    return null
  }

  const tocTree = useMemo((): TOCNode[] => {
    const chapters = readingBook?.parsedChapters
    if (!chapters || chapters.length === 0) return []

    const roots: TOCNode[] = []

    for (const ch of chapters) {
      const parsed = parseTitle(ch.title)

      // Helper: find or create a child node in parent
      const ensureNode = (siblings: TOCNode[], label: string): TOCNode => {
        let found = siblings.find((n) => n.label === label)
        if (!found) {
          found = { key: `node-${label}`, label, children: [] }
          siblings.push(found)
        }
        return found
      }

      // Helper: add a leaf to siblings (returns the leaf node)
      const addLeaf = (siblings: TOCNode[], label: string): TOCNode => {
        const leaf: TOCNode = { key: ch.id, label, children: [], chapterId: ch.id }
        // Remove placeholder with matching label (if a group node was created earlier as placeholder)
        const idx = siblings.findIndex((n) => n.label === label && !n.chapterId && n.children.length === 0)
        if (idx !== -1) {
          siblings[idx] = leaf
        } else {
          siblings.push(leaf)
        }
        return leaf
      }

      if (!parsed) {
        // Can't parse → standalone leaf with full title
        roots.push({ key: ch.id, label: ch.title, children: [], chapterId: ch.id })
        continue
      }

      if (parsed.book && parsed.volume && parsed.chapter) {
        // 3 levels: Book → Volume → Chapter
        const book = ensureNode(roots, parsed.book)
        const vol = ensureNode(book.children, parsed.volume)
        addLeaf(vol.children, parsed.chapter)
      } else if (parsed.book && parsed.volume) {
        // 2 levels: Book → Volume (volume IS the leaf for this file)
        const book = ensureNode(roots, parsed.book)
        addLeaf(book.children, parsed.volume)
      } else if (parsed.book && parsed.chapter) {
        // 2 levels: Book → Chapter
        const book = ensureNode(roots, parsed.book)
        addLeaf(book.children, parsed.chapter)
      } else if (parsed.volume && parsed.chapter) {
        // 2 levels: (no book) Volume → Chapter
        const vol = ensureNode(roots, parsed.volume)
        addLeaf(vol.children, parsed.chapter)
      } else if (parsed.volume) {
        // 1 level: standalone Volume
        roots.push({ key: ch.id, label: parsed.volume, children: [], chapterId: ch.id })
      } else if (parsed.chapter) {
        // 1 level: standalone Chapter
        roots.push({ key: ch.id, label: parsed.chapter, children: [], chapterId: ch.id })
      } else {
        // Fallback
        roots.push({ key: ch.id, label: ch.title, children: [], chapterId: ch.id })
      }
    }
    return roots
  }, [readingBook?.parsedChapters])

  // Auto-expand first book
  useMemo(() => {
    if (tocTree.length > 0 && expandedGroups.size === 0) {
      const firstGroup = tocTree.find((n) => n.children.length > 0)
      if (firstGroup) {
        setExpandedGroups(new Set([firstGroup.key]))
      }
    }
  }, [tocTree])

  // Recursive TOC node renderer
  const renderNode = (node: TOCNode, depth: number) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedGroups.has(node.key)
    const isActive = node.chapterId === currentParsedChapterId

    if (!hasChildren) {
      return (
        <button
          key={node.key}
          onClick={() => node.chapterId && setCurrentParsedChapter(node.chapterId)}
          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
            isActive
              ? 'bg-crimson-50 text-crimson-700 font-medium'
              : 'text-ink-600 hover:bg-leather-50'
          }`}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          {node.label}
        </button>
      )
    }

    return (
      <div key={node.key} className={depth === 0 ? 'mb-1' : ''}>
        <button
          onClick={() => {
            if (node.chapterId) setCurrentParsedChapter(node.chapterId)
            toggleExpanded(node.key)
          }}
          className={`w-full flex items-center gap-1 px-2 py-1.5 rounded-md text-sm transition-colors ${
            depth === 0
              ? 'font-bold text-ink-900'
              : 'font-semibold text-ink-800'
          } ${isActive ? 'bg-crimson-50 text-crimson-700' : 'hover:bg-leather-50'}`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
        >
          {isExpanded ? (
            <ChevronDown size={14} className="shrink-0 text-leather-400" />
          ) : (
            <ChevronRight size={14} className="shrink-0 text-leather-400" />
          )}
          {node.label}
        </button>
        {isExpanded && (
          <div className={`${depth < 2 ? 'ml-3 border-l border-leather-200 pl-2' : ''}`}>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  console.log('[Reader] rendering condition check, readingBook:', readingBook)

  if (!readingBook) {
    return (
      <>
        <div className="animate-fade-in flex gap-8">
          <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="font-serif text-2xl font-bold text-ink-900">阅读工作台</h1>
            <p className="mt-1 font-serif text-sm text-leather-500">
              从书架选择一本图书开始阅读，或浏览下方精选段落
            </p>
          </div>

          <div className="mb-6 rounded-lg border border-leather-200 bg-leather-50/60 p-4">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-leather-400" />
              <p className="font-serif text-sm text-leather-600">
                前往 <a href="/bookshelf" className="text-crimson-700 underline underline-offset-2 hover:text-crimson-900">我的书架</a> 选择图书，或在页面右侧选中概念查阅解读
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {paragraphs.map((para, i) => (
              <div
                key={para.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-2 flex items-center gap-2 text-xs text-leather-500">
                  <span className="rounded bg-leather-100 px-2 py-0.5 font-medium">
                    {para.chapter}
                  </span>
                  <span>{para.section}</span>
                </div>

                <div className="rounded-xl border border-leather-200 bg-white/80 p-6 shadow-book transition-all hover:shadow-book-lg">
                  <p className="font-serif text-[15px] leading-[1.85] text-ink-800">
                    {renderMarkedText(para.content)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {paragraphConceptMap[para.id].map((conceptId) => {
                      const concept = concepts.find((c) => c.id === conceptId)
                      if (!concept) return null
                      const isActive = selectedConcept === conceptId
                      return (
                        <button
                          key={conceptId}
                          onClick={() => setSelectedConcept(isActive ? null : conceptId)}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-crimson-100 text-crimson-800 ring-1 ring-crimon-400'
                              : 'bg-leather-100 text-leather-600 hover:bg-leather-200'
                          }`}
                        >
                          {concept.name}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <TranslationView paragraphIndices={[i]} />
                  {!showAnalysis && (
                    <button
                      onClick={() => {
                        setActiveParagraph(para.id)
                        setShowAnalysis(true)
                      }}
                      className="inline-flex items-center gap-1 text-xs text-leather-500 transition-colors hover:text-crimson-700"
                    >
                      <Lightbulb size={12} />
                      查看解读
                    </button>
                  )}
                  <button className="inline-flex items-center gap-1 text-xs text-leather-500 transition-colors hover:text-crimson-700">
                    <Bookmark size={12} />
                    收藏
                  </button>
                </div>

                {showAnalysis && activeParagraph === para.id && (
                  <div className="mt-3 animate-fade-in rounded-lg border border-leather-200 bg-crimson-50/40 p-4">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Lightbulb size={14} className="text-crimson-600" />
                      <span className="text-xs font-semibold text-crimson-800">段落解读</span>
                    </div>
                    <p className="font-serif text-sm leading-relaxed text-ink-700">
                      {currentAnalysis?.analysis}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-20 rounded-xl border border-leather-200 bg-white/80 shadow-book overflow-hidden">
            <div className="border-b border-leather-200 bg-leather-50/50 px-5 py-3">
              <h2 className="font-serif text-sm font-semibold text-ink-800">概念解读</h2>
            </div>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto">
              <ConceptPanel
                conceptId={selectedConcept}
                onClose={() => setSelectedConcept(null)}
                onSelectConcept={setSelectedConcept}
              />
            </div>
          </div>
        </div>
        <ConceptTooltip concept={hoveredConcept} mousePos={mousePos} />
      </div>
    </>
    )
  }

  // ── Uploaded book with text support (TXT/MD/EPUB) ──
  if (readingBook.source === 'upload' && (readingBook.fileType === 'txt' || readingBook.fileType === 'md' || readingBook.fileType === 'epub')) {
    const contentText = readingBook.contentText || ''
    const chapters = readingBook.parsedChapters || []

    console.log('[Reader] uploaded book rendering:', {
      fileType: readingBook.fileType,
      contentTextLen: contentText.length,
      chaptersCount: chapters.length,
      currentChaptId: currentParsedChapterId,
    })

    const currentChapter = chapters.find((c) => c.id === currentParsedChapterId)
    const chapterText = currentChapter && contentText
      ? contentText.slice(currentChapter.startIndex, currentChapter.endIndex)
      : contentText || ''

    return (
      <>
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Left panel - chapters (collapsible tree) */}
        <div className={`${showTOC ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden shrink-0 bg-white border-r border-leather-200 flex flex-col`}>
          <div className="p-3 border-b border-leather-200 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTOC}
                className="rounded p-0.5 text-leather-400 hover:text-leather-600 hover:bg-leather-100"
                title="收起目录"
              >
                <ChevronLeft size={16} />
              </button>
              <h3 className="font-serif font-bold text-ink-900">{readingBook.title}</h3>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2">
            {tocTree.map((node) => renderNode(node, 0))}
            {tocTree.length === 0 && chapters.length === 0 && (
              <p className="px-3 py-4 text-sm text-leather-400 italic">暂无目录</p>
            )}
          </div>
        </div>

        {/* Center panel - content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-leather-200 bg-white shrink-0">
            <div className="flex items-center gap-3">
              {!showTOC && (
                <button
                  onClick={toggleTOC}
                  className="inline-flex items-center gap-1 text-xs text-leather-500 hover:text-crimson-700"
                  title="展开目录"
                >
                  <ChevronRight size={14} />
                </button>
              )}
              <button
                onClick={() => setReadingBook(null)}
                className="inline-flex items-center gap-1 text-xs text-leather-500 hover:text-crimson-700"
              >
                <ArrowLeft size={14} />返回书架
              </button>
              <h1 className="font-serif text-lg font-bold text-ink-900">{readingBook.title}</h1>
            </div>
            {currentChapter && (
              <p className="text-sm text-leather-500 mt-1">{currentChapter.title}</p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              {chapterText ? (
                <p className="whitespace-pre-wrap leading-relaxed text-ink-800">{renderMarkedText(chapterText)}</p>
              ) : (
                <p className="text-leather-400 italic">
                  {contentText ? '请选择章节以查看内容' : '暂无文本内容'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConceptTooltip concept={hoveredConcept} mousePos={mousePos} />
    </>
    )
  }

  return (
    <>
    <div className="animate-fade-in">
      <TOCSidebar />

      <div className={`transition-all duration-300 ${bookContentWidth}`}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => setReadingBook(null)}
              className="mb-2 inline-flex items-center gap-1 text-xs text-leather-500 transition-colors hover:text-crimson-700"
            >
              <ArrowLeft size={12} />
              返回书架
            </button>
            <h1 className="font-serif text-xl font-bold text-ink-900">{readingBook.title}</h1>
            <p className="font-serif text-sm text-leather-500">{readingBook.author}</p>
          </div>
        </div>

        {readingBook.source === 'upload' && readingBook.fileData ? (
          <div className="rounded-xl border border-leather-200 bg-white/80 shadow-book overflow-hidden">
            {readingBook.fileType === 'pdf' ? (
              <object
                data={readingBook.fileData}
                type="application/pdf"
                className="h-[calc(100vh-12rem)] w-full"
              >
                <div className="flex h-full items-center justify-center p-8">
                  <p className="font-serif text-sm text-leather-500">
                    浏览器不支持直接预览，请下载后查看
                  </p>
                </div>
              </object>
            ) : (
              <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center p-8">
                <p className="font-serif text-sm text-leather-500 mb-4">
                  该格式（.{readingBook.fileType}）暂不支持直接预览
                </p>
                <a
                  href={readingBook.fileData}
                  download={readingBook.fileName}
                  className="inline-flex items-center gap-2 rounded-lg bg-crimson-50 px-4 py-2 text-sm text-crimson-700 hover:bg-crimson-100"
                >
                  <FileText size={16} />
                  下载文件
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              {currentChapter && (
                <div className="mb-4 rounded-lg border border-leather-200 bg-white/70 p-4 shadow-book">
                  <h2 className="font-serif text-base font-semibold text-ink-800">
                    {currentChapter.title}
                  </h2>
                  {currentSection && (
                    <p className="mt-1 text-sm text-leather-500">{currentSection.title}</p>
                  )}
                  {currentChapter.sections.length === 0 && (
                    <p className="mt-3 font-serif text-sm leading-relaxed text-ink-600">
                      本章暂无详细文本内容。请从左侧目录选择具体章节。
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-6">
                {currentChapter?.sections.map((section, i) => (
                  <div
                    key={section.id}
                    className={`animate-fade-in rounded-xl border p-5 shadow-book transition-all ${
                      currentSectionId === section.id
                        ? 'border-crimon-300 bg-crimson-50/20 shadow-book-lg'
                        : 'border-leather-200 bg-white/70 hover:shadow-book-lg'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => setCurrentSection(section.id)}
                  >
                    <h3 className="mb-2 font-serif text-sm font-medium text-ink-800">
                      {section.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {section.title.toLowerCase().includes('存在') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedConcept('sein')
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-leather-100 px-2.5 py-0.5 text-[10px] text-leather-600 transition-colors hover:bg-leather-200"
                        >
                          查看概念
                        </button>
                      )}
                    </div>
                    {readingBook.id === 'sein-und-zeit' && sectionToTranslation[section.id]?.length > 0 && (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <TranslationView paragraphIndices={sectionToTranslation[section.id]} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-20 rounded-xl border border-leather-200 bg-white/80 shadow-book overflow-hidden">
                <div className="border-b border-leather-200 bg-leather-50/50 px-5 py-3">
                  <h2 className="font-serif text-sm font-semibold text-ink-800">概念解读</h2>
                </div>
                <div className="h-[calc(100vh-12rem)] overflow-y-auto">
                  <ConceptPanel
                    conceptId={selectedConcept}
                    onClose={() => setSelectedConcept(null)}
                    onSelectConcept={setSelectedConcept}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <ConceptTooltip concept={hoveredConcept} mousePos={mousePos} />
    </>
  )
}