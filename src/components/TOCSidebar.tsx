import { ChevronRight, ChevronDown, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { useBookStore } from '@/stores/bookStore'
import { cn } from '@/lib/utils'

export default function TOCSidebar() {
  const {
    readingBook,
    currentChapterId,
    currentSectionId,
    showTOC,
    toggleTOC,
    setCurrentChapter,
    setCurrentSection,
  } = useBookStore()

  if (!readingBook) return null

  return (
    <>
      <button
        onClick={toggleTOC}
        className="fixed left-4 top-20 z-30 rounded-full border border-leather-200 bg-white/80 p-2 shadow-book transition-colors hover:bg-leather-100"
        title={showTOC ? '收起目录' : '展开目录'}
      >
        {showTOC ? (
          <PanelRightClose size={16} className="text-leather-600" />
        ) : (
          <PanelRightOpen size={16} className="text-leather-600" />
        )}
      </button>

      <div
        className={cn(
          'fixed left-0 top-14 z-20 h-[calc(100vh-3.5rem)] border-r border-leather-200 bg-white/95 shadow-book transition-all duration-300 overflow-y-auto',
          showTOC ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
        )}
      >
        <div className="border-b border-leather-200 px-4 py-3">
          <h3 className="truncate font-serif text-sm font-semibold text-ink-800">
            {readingBook.title}
          </h3>
          <p className="truncate text-xs text-leather-500">{readingBook.author}</p>
        </div>

        <div className="p-2">
          {readingBook.chapters.map((chapter) => {
            const isActive = currentChapterId === chapter.id
            return (
              <div key={chapter.id} className="mb-1">
                <button
                  onClick={() => {
                    setCurrentChapter(chapter.id)
                    if (chapter.sections.length > 0) {
                      setCurrentSection(chapter.sections[0].id)
                    }
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs transition-colors',
                    isActive
                      ? 'bg-crimson-50 font-medium text-crimson-800'
                      : 'text-ink-700 hover:bg-leather-100'
                  )}
                >
                  {chapter.sections.length > 0 ? (
                    isActive ? (
                      <ChevronDown size={12} className="shrink-0" />
                    ) : (
                      <ChevronRight size={12} className="shrink-0" />
                    )
                  ) : (
                    <span className="w-3 shrink-0" />
                  )}
                  <span className="truncate">{chapter.title}</span>
                </button>

                {isActive && chapter.sections.length > 0 && (
                  <div className="ml-3 border-l border-leather-200 pl-2">
                    {chapter.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(section.id)}
                        className={cn(
                          'block w-full rounded px-3 py-1.5 text-left text-xs transition-colors',
                          currentSectionId === section.id
                            ? 'font-medium text-crimson-700'
                            : 'text-leather-500 hover:text-ink-700'
                        )}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}