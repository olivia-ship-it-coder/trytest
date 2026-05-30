import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Upload, BookOpen, Trash2, FileText } from 'lucide-react'
import { useBookStore } from '@/stores/bookStore'
import SearchModal from '@/components/SearchModal'
import UploadModal from '@/components/UploadModal'

export default function Bookshelf() {
  const navigate = useNavigate()
  const { books, setReadingBook, setShowSearchModal, setShowUploadModal, removeBook } = useBookStore()
  const [filter, setFilter] = useState<'all' | 'library' | 'upload'>('all')

  const filtered = useMemo(() => {
    return filter === 'all' ? books : books.filter((b) => b.source === filter)
  }, [books, filter])

  const openBook = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)
    if (book) {
      setReadingBook(book)
      navigate('/')
    }
  }

  const formatSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">我的书架</h1>
          <p className="mt-1 font-serif text-sm text-leather-500">
            共 {books.length} 本图书
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSearchModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-leather-200 bg-white/70 px-3.5 py-2 text-xs font-medium text-ink-700 transition-colors hover:bg-leather-100"
          >
            <Search size={14} />
            搜索图书
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-leather-900 px-3.5 py-2 text-xs font-medium text-page-light transition-colors hover:bg-leather-800"
          >
            <Upload size={14} />
            上传 PDF
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-2">
        {(['all', 'library', 'upload'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === key
                ? 'bg-leather-900 text-page-light shadow-inner-glow'
                : 'bg-white/70 text-leather-600 hover:bg-leather-100'
            }`}
          >
            {key === 'all' ? '全部' : key === 'library' ? '图书馆' : '上传的'}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((book, i) => (
          <div
            key={book.id}
            className="animate-fade-in group flex flex-col rounded-xl border border-leather-200 bg-white/70 shadow-book transition-all hover:-translate-y-0.5 hover:shadow-book-lg"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div
              className="relative flex h-40 items-end rounded-t-xl p-4"
              style={{ backgroundColor: book.coverColor }}
            >
              <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-black/40 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-serif text-lg font-bold leading-snug text-white drop-shadow-sm">
                  {book.title}
                </h3>
                <p className="mt-0.5 text-xs text-white/80">{book.author}</p>
              </div>
              {book.source === 'upload' && (
                <div className="absolute right-3 top-3 z-10 rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                  <FileText size={10} className="mr-0.5 inline" />
                  {book.fileType?.toUpperCase() || 'FILE'}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="mb-3 line-clamp-2 flex-1 font-serif text-xs leading-relaxed text-leather-600">
                {book.description}
              </p>
              <div className="mb-3 flex items-center gap-2 text-[10px] text-leather-400">
                <span>{book.chapters.length} 章</span>
                {book.fileSize && (
                  <>
                    <span>·</span>
                    <span>{formatSize(book.fileSize)}</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openBook(book.id)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-crimson-50 py-1.5 text-xs font-medium text-crimson-700 transition-colors hover:bg-crimson-100"
                >
                  <BookOpen size={12} />
                  阅读
                </button>
                {book.source === 'upload' && (
                  <button
                    onClick={() => removeBook(book.id)}
                    className="rounded-lg border border-leather-200 px-2.5 py-1.5 text-leather-400 transition-colors hover:border-red-200 hover:text-red-500"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-leather-200">
          <div className="text-center">
            <p className="font-serif text-sm text-leather-400">
              {filter === 'upload' ? '还没有上传过 PDF 图书' : '暂无图书'}
            </p>
            {filter === 'upload' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-2 text-xs text-crimon-600 hover:text-crimson-800"
              >
                上传一本
              </button>
            )}
          </div>
        </div>
      )}

      {useBookStore.getState().showSearchModal && <SearchModal />}
      {useBookStore.getState().showUploadModal && <UploadModal />}
    </div>
  )
}