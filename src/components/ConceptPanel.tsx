import { X, ArrowRight } from 'lucide-react'
import { concepts } from '@/data/concepts'
import type { Concept } from '@/types'

interface ConceptPanelProps {
  conceptId: string | null
  onClose: () => void
  onSelectConcept: (id: string) => void
}

export default function ConceptPanel({ conceptId, onClose, onSelectConcept }: ConceptPanelProps) {
  if (!conceptId) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="px-6 text-center">
          <div className="mb-3 text-5xl text-leather-300">&#10059;</div>
          <p className="font-serif text-sm leading-relaxed text-leather-500">
            选中文本中的高亮概念，<br />即可在此查看详细解读
          </p>
        </div>
      </div>
    )
  }

  const concept = concepts.find((c) => c.id === conceptId)
  if (!concept) return null

  return (
    <div className="animate-slide-in flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-leather-200 px-5 py-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink-900">{concept.name}</h3>
          <span className="text-xs text-leather-500">{concept.pinyin}</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-leather-400 transition-colors hover:bg-leather-100 hover:text-leather-700"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-crimson-50 px-2.5 py-0.5 text-xs font-medium text-crimson-800">
            {concept.field}
          </span>
        </div>

        <p className="mb-4 font-serif text-sm leading-relaxed text-ink-700">
          {concept.shortDefinition}
        </p>

        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-leather-500">
          详细解读
        </h4>
        <div className="mb-6 whitespace-pre-line font-serif text-sm leading-relaxed text-ink-800">
          {concept.detailedExplanation}
        </div>

        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-leather-500">
          出处
        </h4>
        <p className="mb-6 text-xs italic text-leather-600">{concept.source}</p>

        {concept.relatedConcepts.length > 0 && (
          <>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-leather-500">
              关联概念
            </h4>
            <div className="flex flex-wrap gap-2">
              {concept.relatedConcepts.map((relatedId) => {
                const related = concepts.find((c) => c.id === relatedId)
                if (!related) return null
                return (
                  <button
                    key={relatedId}
                    onClick={() => onSelectConcept(relatedId)}
                    className="group inline-flex items-center gap-1 rounded-full border border-leather-300 bg-white/60 px-3 py-1 text-xs text-ink-700 transition-all hover:border-crimson-400 hover:bg-crimson-50 hover:text-crimson-800"
                  >
                    {related.name}
                    <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}