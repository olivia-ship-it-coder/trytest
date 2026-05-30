import { useState } from 'react'
import { ChevronDown, ChevronUp, Languages } from 'lucide-react'
import { translations } from '@/data/translations'
import { paragraphs } from '@/data/paragraphs'

interface TranslationViewProps {
  paragraphIndices: number[]
  showOriginal?: boolean
}

export default function TranslationView({ paragraphIndices, showOriginal }: TranslationViewProps) {
  const [open, setOpen] = useState(false)
  const [activeTranslator, setActiveTranslator] = useState(translations[0]?.id ?? '')

  if (paragraphIndices.length === 0) return null

  const originalTexts = showOriginal
    ? paragraphIndices.map((idx) => paragraphs[idx]).filter(Boolean)
    : []

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-xs text-leather-500 transition-colors hover:text-crimson-700"
      >
        <Languages size={12} />
        译本对照
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {open && (
        <div className="mt-3 animate-fade-in rounded-lg border border-leather-200 bg-page-light p-4">
          {originalTexts.length > 0 && (
            <div className="mb-3 border-b border-leather-200 pb-3">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-leather-500">
                原文
              </p>
              {originalTexts.map((p, i) => (
                <p key={p.id} className="font-serif text-sm leading-relaxed text-ink-800">
                  {p.content}
                </p>
              ))}
            </div>
          )}

          <div className="mb-3 flex flex-wrap gap-1.5">
            {translations.map((t) => {
              const isActive = activeTranslator === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTranslator(t.id)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-leather-900 text-page-light shadow-inner-glow'
                      : 'bg-leather-100 text-leather-600 hover:bg-leather-200'
                  }`}
                >
                  {t.translator}
                </button>
              )
            })}
          </div>

          <div className="space-y-2">
            {paragraphIndices.map((idx) => {
              const activeTranslation = translations.find((t) => t.id === activeTranslator)
              const para = activeTranslation?.paragraphs[idx]
              if (!para) return null
              return (
                <p
                  key={`${activeTranslator}-${idx}`}
                  className="font-serif text-sm leading-relaxed text-ink-700"
                >
                  {para.content}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}