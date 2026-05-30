import { useState, useMemo } from 'react'
import { Search, X, BookOpen } from 'lucide-react'
import { useBookStore } from '@/stores/bookStore'
import { useNavigate } from 'react-router-dom'

export default function SearchModal() {
  const [query, setQuery] = useState('')
  const { books, setShowSearchModal, setReadingBook } = useBookStore()
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    )
  }, [query, books])

  const openBook = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)
    if (book) {
      setReadingBook(book)
      setShowSearchModal(false)
      navigate('/')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24 backdrop-blur-sm"
      onClick={() => setShowSearchModal(false)}
    >
      <div
        className="mx-4 w-full max-w-xl rounded-xl bg-page-light shadow-book-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-leather-200 px-5 py-3">
          <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-leather-400" />
          <input
            type="text"
            placeholder="搜索书名或作者..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-8 pr-4 font-serif text-base text-ink-800 placeholder:text-leather-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setShowSearchModal(false)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-leather-400 hover:text-leather-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && query.trim() && (
            <p className="py-8 text-center font-serif text-sm text-leather-400">
              未找到匹配的图书
            </p>
          )}
          {results.map((book) => (
            <button
              key={book.id}
              onClick={() => openBook(book.id)}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition-colors hover:bg-leather-100"
            >
              <div
                className="flex h-12 w-9 shrink-0 items-center justify-center rounded shadow-sm"
                style={{ backgroundColor: book.coverColor }}
              >
                <BookOpen size={16} className="text-white/80" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-sm font-medium text-ink-800">
                  {book.title}
                </p>
                <p className="truncate text-xs text-leather-500">{book.author}</p>
              </div>
              <span className="text-xs text-leather-400">
                {book.chapters.length} 章
              </span>
            </button>
          ))}
        </div>

        {!query.trim() && (
          <div className="px-5 py-4 text-center">
            <p className="font-serif text-xs text-leather-400">输入书名或作者开始搜索</p>
          </div>
        )}
      </div>
    </div>
  )
}