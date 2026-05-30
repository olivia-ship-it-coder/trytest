import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { translations } from '@/data/translations'
import { paragraphs } from '@/data/paragraphs'
import type { Translation } from '@/types'

export default function Compare() {
  const [activeTranslations, setActiveTranslations] = useState<string[]>(
    translations.slice(0, 2).map((t) => t.id)
  )
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])
  const isSyncing = useRef(false)

  const availableTranslations = translations.filter((t) => !activeTranslations.includes(t.id))

  const toggleTranslation = (id: string) => {
    if (activeTranslations.includes(id)) {
      setActiveTranslations((prev) => prev.filter((t) => t !== id))
    } else if (activeTranslations.length < 4) {
      setActiveTranslations((prev) => [...prev, id])
    }
  }

  const maxParagraphs = Math.max(
    ...activeTranslations.map((tid) => {
      const t = translations.find((tr) => tr.id === tid)
      return t ? t.paragraphs.length : 0
    })
  )

  const handleSyncScroll = useCallback((sourceIndex: number) => {
    const sourceEl = scrollRefs.current[sourceIndex]
    if (!sourceEl || isSyncing.current) return
    isSyncing.current = true

    const ratio = sourceEl.scrollTop / (sourceEl.scrollHeight - sourceEl.clientHeight)

    scrollRefs.current.forEach((el, i) => {
      if (i !== sourceIndex && el) {
        el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
      }
    })

    requestAnimationFrame(() => {
      isSyncing.current = false
    })
  }, [])

  useEffect(() => {
    scrollRefs.current.forEach((el) => {
      if (el) el.scrollTop = 0
    })
  }, [currentParagraph])

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-ink-900">译本对照室</h1>
        <p className="mt-1 font-serif text-sm text-leather-500">
          海德格尔《存在与时间》导论 · 多译本对照阅读
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-leather-500">选择译本：</span>
        {translations.map((t) => {
          const isActive = activeTranslations.includes(t.id)
          return (
            <button
              key={t.id}
              onClick={() => toggleTranslation(t.id)}
              disabled={!isActive && activeTranslations.length >= 4}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-leather-900 text-page-light shadow-inner-glow'
                  : 'bg-white/70 text-leather-600 hover:bg-leather-100'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {t.translator}
            </button>
          )
        })}
        <span className="ml-2 text-xs text-leather-400">
          {activeTranslations.length < 4 ? `还可选择 ${4 - activeTranslations.length} 个译本` : '最多 4 个译本'}
        </span>
      </div>

      {activeTranslations.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentParagraph((p) => Math.max(0, p - 1))}
              disabled={currentParagraph === 0}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-leather-600 transition-colors hover:bg-leather-100 disabled:opacity-30"
            >
              <ChevronLeft size={14} />
              前一段落
            </button>
            <span className="font-serif text-xs text-leather-500">
              §{currentParagraph + 1} / {maxParagraphs}
            </span>
            <button
              onClick={() => setCurrentParagraph((p) => Math.min(maxParagraphs - 1, p + 1))}
              disabled={currentParagraph >= maxParagraphs - 1}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-leather-600 transition-colors hover:bg-leather-100 disabled:opacity-30"
            >
              后一段落
              <ChevronRight size={14} />
            </button>
          </div>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${activeTranslations.length}, 1fr)` }}
          >
            {activeTranslations.map((tid, colIndex) => {
              const t = translations.find((tr) => tr.id === tid) as Translation
              const para = t.paragraphs[currentParagraph]
              const originalPara = paragraphs[currentParagraph]

              return (
                <div
                  key={tid}
                  className="animate-fade-in flex flex-col rounded-xl border border-leather-200 bg-white/70 shadow-book"
                  style={{ animationDelay: `${colIndex * 80}ms` }}
                >
                  <div className="border-b border-leather-200 bg-leather-50/50 px-4 py-3">
                    <h3 className="font-serif text-sm font-semibold text-ink-800">{t.name}</h3>
                    <p className="text-xs text-leather-500">
                      {t.translator} · {t.publisher} {t.year}
                    </p>
                  </div>

                  <div
                    ref={(el) => { scrollRefs.current[colIndex] = el }}
                    onScroll={() => handleSyncScroll(colIndex)}
                    className="sync-scroll-container flex-1 px-4 py-4"
                    style={{ height: 'calc(100vh - 280px)' }}
                  >
                    {para ? (
                      <div className="space-y-4">
                        <p className="font-serif text-sm leading-[1.85] text-ink-800">
                          {para.content}
                        </p>

                        {originalPara && (
                          <div className="mt-4 rounded-lg border border-leather-200 bg-leather-50/60 p-3">
                            <h4 className="mb-1.5 text-xs font-semibold text-leather-500">原文章节</h4>
                            <p className="text-xs text-leather-600">
                              {originalPara.chapter} · {originalPara.section}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="font-serif text-sm text-leather-400">该译本无此段落</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {activeTranslations.length === 0 && (
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-leather-200">
          <p className="font-serif text-leather-400">请选择至少一个译本开始对照阅读</p>
        </div>
      )}
    </div>
  )
}