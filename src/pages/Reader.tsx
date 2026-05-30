import { useState, useMemo } from 'react'
import { BookOpen, Lightbulb, Bookmark, ArrowLeft } from 'lucide-react'
import { paragraphs } from '@/data/paragraphs'
import { concepts } from '@/data/concepts'
import { sectionToTranslation } from '@/data/sectionTranslationMap'
import { useBookStore } from '@/stores/bookStore'
import ConceptPanel from '@/components/ConceptPanel'
import TOCSidebar from '@/components/TOCSidebar'
import TranslationView from '@/components/TranslationView'

export default function Reader() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [activeParagraph, setActiveParagraph] = useState<string | null>(null)

  const {
    readingBook,
    currentChapterId,
    currentSectionId,
    showTOC,
    setReadingBook,
    setCurrentSection,
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

  if (!readingBook) {
    return (
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
                    {para.content}
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
      </div>
    )
  }

  return (
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

        {readingBook.source === 'upload' && readingBook.pdfData ? (
          <div className="rounded-xl border border-leather-200 bg-white/80 shadow-book overflow-hidden">
            <object
              data={readingBook.pdfData}
              type="application/pdf"
              className="h-[calc(100vh-12rem)] w-full"
            >
              <div className="flex h-full items-center justify-center p-8">
                <p className="font-serif text-sm text-leather-500">
                  浏览器不支持直接预览，请下载后查看
                </p>
              </div>
            </object>
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
  )
}