import { X } from 'lucide-react'
import { concepts } from '@/data/concepts'
import { conceptEvolution } from '@/data/conceptEvolution'
import type { Concept } from '@/types'

interface ConceptEvolutionProps {
  concept: Concept | null
  onClose: () => void
}

export default function ConceptEvolution({ concept, onClose }: ConceptEvolutionProps) {
  if (!concept) return null

  const evolution = conceptEvolution[concept.id]
  const related = concepts.find((c) => c.id === concept.id)

  return (
    <div className="animate-slide-in flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-leather-200 px-5 py-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink-900">{concept.name}</h3>
          <span className="text-xs text-leather-500">
            {concept.pinyin} · 概念演变史
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-leather-400 transition-colors hover:bg-leather-100 hover:text-leather-700"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {!evolution ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-12">
            <p className="font-serif text-sm text-leather-400">
              暂无"{concept.name}"的演变资料
            </p>
            <p className="text-xs text-leather-300">
              该概念可能为特定哲学家的独创术语
            </p>
          </div>
        ) : (
          <div className="relative">
            {evolution.map((stage, i) => (
              <div key={i} className="relative pb-8 pl-8 last:pb-0">
                {/* Timeline line */}
                {i < evolution.length - 1 && (
                  <div className="absolute bottom-0 left-[11px] top-4 w-px bg-leather-200" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-crimon-300 bg-white">
                  <div className="h-2 w-2 rounded-full bg-crimon-300" />
                </div>
                {/* Content */}
                <div className="rounded-lg border border-leather-200 bg-leather-50/40 p-4 transition-colors hover:bg-leather-50/80">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold text-ink-900">
                      {stage.philosopher}
                    </h4>
                    <span className="rounded bg-leather-150 bg-white px-1.5 py-0.5 text-[10px] text-leather-500">
                      {stage.era}
                    </span>
                    <span className="text-[10px] text-leather-400">{stage.year}</span>
                  </div>
                  <p className="font-serif text-xs leading-relaxed text-ink-700">
                    {stage.summary}
                  </p>
                  {stage.keyText && (
                    <blockquote className="mt-2 border-l-2 border-crimon-200 bg-crimson-50/40 pl-2.5 pr-2 py-1.5 rounded-r text-[11px] italic leading-relaxed text-leather-600">
                      {stage.keyText}
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {related && (
          <div className="mt-4 rounded-lg border border-leather-200 bg-white/50 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-leather-500">
              当前概念
            </p>
            <p className="mt-1 font-serif text-sm text-ink-700">
              {related.shortDefinition}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}