import type { Concept } from '@/types'

interface ConceptTooltipProps {
  concept: Concept | null
  mousePos: { x: number; y: number } | null
}

export default function ConceptTooltip({ concept, mousePos }: ConceptTooltipProps) {
  if (!concept || !mousePos) return null

  const tooltipWidth = 260

  const left = Math.min(mousePos.x + 16, window.innerWidth - tooltipWidth - 16)
  const top = Math.min(mousePos.y + 16, window.innerHeight - 240)

  return (
    <div
      className="fixed z-[100] pointer-events-none animate-fade-in"
      style={{ left, top }}
    >
      <div className="w-[260px] rounded-xl border border-leather-200 bg-white shadow-book-lg overflow-hidden">
        <div className="border-b border-leather-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-ink-900">{concept.name}</h4>
            {concept.pinyin && (
              <span className="text-xs text-leather-400">({concept.pinyin})</span>
            )}
          </div>
          <span className="mt-1 inline-block rounded bg-crimson-50 px-1.5 py-0.5 text-[10px] text-crimon-700">
            {concept.field}
          </span>
        </div>
        <div className="px-4 py-3">
          <p className="text-sm leading-relaxed text-ink-700">
            {concept.shortDefinition}
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-leather-400">
            出处：{concept.source}
          </p>
        </div>
      </div>
    </div>
  )
}