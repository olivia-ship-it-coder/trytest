import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Languages } from 'lucide-react'
import { translations } from '@/data/translations'
import { paragraphs } from '@/data/paragraphs'
import { cn } from '@/lib/utils'

interface TranslationViewProps {
  paragraphIndices: number[]
  showOriginal?: boolean
}

export default function TranslationView({ paragraphIndices, showOriginal }: TranslationViewProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([translations[0]?.id].filter(Boolean))

  if (paragraphIndices.length === 0) return null

  const originalTexts = showOriginal
    ? paragraphIndices.map((idx) => paragraphs[idx]).filter(Boolean)
    : []

  const toggleTranslator = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((t) => t !== id)
        return next.length === 0 ? [translations[0]?.id].filter(Boolean) : next
      }
      return [...prev, id]
    })
  }

  const visibleTranslations = useMemo(
    () => translations.filter((t) => selected.includes(t.id)),
    [selected]
  )

  const columnCount = visibleTranslations.length

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex shrink-0 items-center gap-1 text-xs text-leather-500 transition-colors hover:text-crimson-700"
        >
          <Languages size={12} />
          译本对照
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        <div className="flex flex-wrap justify-end gap-1">
          {translations.map((t) => {
            const isActive = selected.includes(t.id)
            return (
              <button
                key={t.id}
                onClick={() => toggleTranslator(t.id)}
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium transition-all',
                  isActive
                    ? 'bg-leather-900 text-page-light shadow-inner-glow'
                    : 'bg-leather-100 text-leather-500 hover:bg-leather-200'
                )}
              >
                {t.translator}
              </button>
            )
          })}
        </div>
      </div>

      {open && (
        <div className="mt-3 animate-fade-in rounded-lg border border-leather-200 bg-page-light p-4">
          {originalTexts.length > 0 && (
            <div className="mb-3 border-b border-leather-200 pb-3">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-leather-500">
                原文
              </p>
              {originalTexts.map((p) => (
                <p key={p.id} className="font-serif text-sm leading-relaxed text-ink-800">
                  {p.content}
                </p>
              ))}
            </div>
          )}

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
          >
            {visibleTranslations.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-leather-200 bg-white/70 p-3 shadow-sm"
              >
                <p className="mb-2 border-b border-leather-100 pb-1.5 font-serif text-xs font-semibold text-ink-800">
                  {t.translator}
                </p>
                <div className="space-y-2">
                  {paragraphIndices.map((idx) => {
                    const para = t.paragraphs[idx]
                    if (!para) return null
                    return (
                      <p
                        key={`${t.id}-${idx}`}
                        className="font-serif text-xs leading-relaxed text-ink-700"
                      >
                        {para.content}
                      </p>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}