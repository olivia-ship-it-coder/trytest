import { translations } from '@/data/translations'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CompareGridViewProps {
  paragraphIndices: number[]
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  title?: string
}

export default function CompareGridView({
  paragraphIndices,
  currentIndex,
  total,
  onPrev,
  onNext,
  title,
}: CompareGridViewProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div>
          {title && (
            <h2 className="font-serif text-sm font-semibold text-ink-800">{title}</h2>
          )}
          {total > 1 && (
            <span className="text-xs text-leather-500">
              译本对照 · 第 {currentIndex + 1} / {total} 组段落
            </span>
          )}
        </div>
        {total > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="rounded-lg p-1.5 text-leather-500 transition-colors hover:bg-leather-100 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={onNext}
              disabled={currentIndex >= total - 1}
              className="rounded-lg p-1.5 text-leather-500 transition-colors hover:bg-leather-100 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {translations.map((t) => {
          const content = paragraphIndices
            .map((idx) => t.paragraphs[idx])
            .filter(Boolean)
          return (
            <div
              key={t.id}
              className="flex flex-col rounded-lg border border-leather-200 bg-white/80 p-3 shadow-book"
            >
              <div className="mb-2 border-b border-leather-100 pb-1.5">
                <p className="font-serif text-xs font-semibold text-ink-800">
                  {t.translator}
                </p>
                <p className="text-[10px] text-leather-400">
                  {t.publisher} {t.year}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {content.length === 0 ? (
                  <p className="text-xs text-leather-400">无对应译文</p>
                ) : (
                  content.map((para, i) => (
                    <p
                      key={`${t.id}-${i}`}
                      className="font-serif text-xs leading-relaxed text-ink-700"
                    >
                      {para.content}
                    </p>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}