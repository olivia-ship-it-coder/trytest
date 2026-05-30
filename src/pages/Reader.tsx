import { useState, useMemo } from 'react'
import { Bookmark, Lightbulb } from 'lucide-react'
import { paragraphs } from '@/data/paragraphs'
import { concepts } from '@/data/concepts'
import ConceptPanel from '@/components/ConceptPanel'

export default function Reader() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [activeParagraph, setActiveParagraph] = useState<string | null>(null)

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

  return (
    <div className="animate-fade-in flex gap-8">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-ink-900">阅读工作台</h1>
          <p className="mt-1 font-serif text-sm text-leather-500">
            海德格尔《存在与时间》 · 精选段落
          </p>
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

              <div
                className="rounded-xl border border-leather-200 bg-white/80 p-6 shadow-book transition-all hover:shadow-book-lg"
              >
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

              <div className="mt-3 flex items-center gap-2">
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