import { ChevronDown, ChevronUp, Languages } from 'lucide-react'
import { useState } from 'react'
import { translations } from '@/data/translations'

interface TranslationViewProps {
  paragraphIndices: number[]
}

export default function TranslationView({ paragraphIndices }: TranslationViewProps) {
  const [open, setOpen] = useState(false)

  if (paragraphIndices.length === 0) return null

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
        <div className="mt-3 animate-fade-in space-y-3 rounded-lg border border-leather-200 bg-page-light p-4">
          {translations.map((t) => (
            <div key={t.id}>
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-leather-100 px-2 py-0.5 text-[10px] font-medium text-leather-600">
                  {t.translator}
                </span>
                <span className="text-[10px] text-leather-400">
                  {t.publisher} {t.year}
                </span>
              </div>
              <div className="space-y-1">
                {paragraphIndices.map((idx) => {
                  const para = t.paragraphs[idx]
                  if (!para) return null
                  return (
                    <p key={`${t.id}-${idx}`} className="font-serif text-xs leading-relaxed text-ink-700">
                      {para.content}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}