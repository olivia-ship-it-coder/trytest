import { useState, useMemo } from 'react'
import { Search, X, ChevronRight, ArrowRight, LayoutGrid, Share2 } from 'lucide-react'
import { concepts } from '@/data/concepts'
import type { Concept } from '@/types'
import ConceptGraph from '@/components/ConceptGraph'

const fields = Array.from(new Set(concepts.map((c) => c.field)))

function ConceptDetailModal({ concept, onClose, onNavigate }: {
  concept: Concept
  onClose: () => void
  onNavigate: (id: string) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-4 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-page-light shadow-book-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-leather-200 bg-page-light px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink-900">{concept.name}</h2>
            <span className="text-xs text-leather-500">{concept.pinyin}</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-leather-400 transition-colors hover:bg-leather-100 hover:text-leather-700">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-crimson-50 px-3 py-1 text-xs font-medium text-crimson-800">
              {concept.field}
            </span>
          </div>
          <p className="mb-6 font-serif text-base leading-relaxed text-ink-700">{concept.shortDefinition}</p>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-leather-500">详细解读</h3>
          <div className="mb-6 whitespace-pre-line font-serif text-sm leading-relaxed text-ink-800">
            {concept.detailedExplanation}
          </div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-leather-500">出处</h3>
          <p className="mb-6 text-sm italic text-leather-600">{concept.source}</p>
          {concept.relatedConcepts.length > 0 && (
            <>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-leather-500">关联概念</h3>
              <div className="flex flex-wrap gap-2">
                {concept.relatedConcepts.map((relatedId) => {
                  const related = concepts.find((c) => c.id === relatedId)
                  if (!related) return null
                  return (
                    <button
                      key={relatedId}
                      onClick={() => onNavigate(relatedId)}
                      className="group inline-flex items-center gap-1 rounded-full border border-leather-300 bg-white/60 px-3.5 py-1.5 text-sm text-ink-700 transition-all hover:border-crimson-400 hover:bg-crimson-50 hover:text-crimson-800"
                    >
                      {related.name}
                      <ArrowRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Concepts() {
  const [search, setSearch] = useState('')
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'graph'>('cards')

  const filtered = useMemo(() => {
    return concepts.filter((c) => {
      const matchSearch = !search || c.name.includes(search) || c.pinyin.includes(search) || c.shortDefinition.includes(search)
      const matchField = !selectedField || c.field === selectedField
      return matchSearch && matchField
    })
  }, [search, selectedField])

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">概念图书馆</h1>
          <p className="mt-1 font-serif text-sm text-leather-500">
            共 {concepts.length} 个哲学概念 · 选自海德格尔《存在与时间》
          </p>
        </div>
        <div className="flex rounded-lg border border-leather-200 bg-white/70 p-0.5 shadow-sm">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === 'cards'
                ? 'bg-leather-900 text-page-light shadow-inner-glow'
                : 'text-leather-500 hover:text-leather-700'
            }`}
          >
            <LayoutGrid size={14} />
            卡片
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === 'graph'
                ? 'bg-leather-900 text-page-light shadow-inner-glow'
                : 'text-leather-500 hover:text-leather-700'
            }`}
          >
            <Share2 size={14} />
            图谱
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-leather-400" />
          <input
            type="text"
            placeholder="搜索概念名称、拼音或释义..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-leather-200 bg-white/70 py-2.5 pl-9 pr-4 font-serif text-sm text-ink-800 placeholder:text-leather-400 focus:border-crimson-400 focus:outline-none focus:ring-1 focus:ring-crimson-400/30"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-leather-400 hover:text-leather-600">
              <X size={14} />
            </button>
          )}
        </div>
        {viewMode === 'cards' && (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedField(null)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                !selectedField
                  ? 'bg-leather-900 text-page-light'
                  : 'bg-white/70 text-leather-600 hover:bg-leather-100'
              }`}
            >
              全部
            </button>
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => setSelectedField(field === selectedField ? null : field)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  field === selectedField
                    ? 'bg-leather-900 text-page-light'
                    : 'bg-white/70 text-leather-600 hover:bg-leather-100'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        )}
      </div>

      {viewMode === 'cards' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((concept, i) => (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              className="group animate-fade-in rounded-xl border border-leather-200 bg-white/70 p-5 text-left shadow-book transition-all hover:-translate-y-0.5 hover:shadow-book-lg"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink-900 group-hover:text-crimson-800 transition-colors">
                    {concept.name}
                  </h3>
                  <span className="text-xs text-leather-400">{concept.pinyin}</span>
                </div>
                <ChevronRight size={16} className="mt-1 text-leather-300 transition-all group-hover:translate-x-0.5 group-hover:text-crimson-500" />
              </div>
              <p className="mb-3 line-clamp-3 font-serif text-sm leading-relaxed text-ink-600">
                {concept.shortDefinition}
              </p>
              <span className="inline-block rounded-full bg-crimson-50 px-2.5 py-0.5 text-xs font-medium text-crimson-800">
                {concept.field}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <ConceptGraph
          concepts={concepts}
          selectedId={selectedConcept?.id ?? null}
          onSelect={(id) => {
            const concept = concepts.find((c) => c.id === id)
            if (concept) setSelectedConcept(concept)
          }}
        />
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-serif text-leather-400">未找到匹配的概念</p>
        </div>
      )}

      {selectedConcept && (
        <ConceptDetailModal
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
          onNavigate={(id) => {
            const next = concepts.find((c) => c.id === id)
            if (next) setSelectedConcept(next)
          }}
        />
      )}
    </div>
  )
}