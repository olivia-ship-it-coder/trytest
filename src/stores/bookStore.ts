import { create } from 'zustand'
import type { Book, Chapter, Section, Annotation, Highlight, ParsedChapter } from '@/types'
import { libraryBooks } from '@/data/libraryBooks'

interface BookState {
  books: Book[]
  readingBook: Book | null
  currentChapterId: string | null
  currentSectionId: string | null
  currentParsedChapterId: string | null
  showTOC: boolean
  showSearchModal: boolean
  showUploadModal: boolean

  setReadingBook: (book: Book | null) => void
  setCurrentChapter: (chapterId: string) => void
  setCurrentSection: (sectionId: string | null) => void
  setCurrentParsedChapter: (chapterId: string | null) => void
  toggleTOC: () => void
  setShowSearchModal: (show: boolean) => void
  setShowUploadModal: (show: boolean) => void
  addUploadedBook: (book: Book) => void
  removeBook: (bookId: string) => void
  getBookById: (id: string) => Book | undefined
  updateBookContent: (bookId: string, contentText: string, parsedChapters: ParsedChapter[]) => void
  addAnnotation: (annotation: Annotation) => void
  removeAnnotation: (annotationId: string) => void
  addHighlight: (highlight: Highlight) => void
  removeHighlight: (highlightId: string) => void
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [...libraryBooks],
  readingBook: null,
  currentChapterId: null,
  currentSectionId: null,
  currentParsedChapterId: null,
  showTOC: true,
  showSearchModal: false,
  showUploadModal: false,

  setReadingBook: (book) =>
    set({
      readingBook: book,
      currentChapterId: book?.chapters[0]?.id ?? null,
      currentSectionId: book?.chapters[0]?.sections[0]?.id ?? null,
      currentParsedChapterId: book?.parsedChapters?.[0]?.id ?? null,
      showTOC: true,
    }),

  setCurrentChapter: (chapterId) =>
    set({ currentChapterId: chapterId, currentSectionId: null }),

  setCurrentSection: (sectionId) =>
    set({ currentSectionId: sectionId }),

  setCurrentParsedChapter: (chapterId) =>
    set({ currentParsedChapterId: chapterId }),

  toggleTOC: () => set((s) => ({ showTOC: !s.showTOC })),

  setShowSearchModal: (show) => set({ showSearchModal: show }),
  setShowUploadModal: (show) => set({ showUploadModal: show }),

  addUploadedBook: (book) =>
    set((s) => ({ books: [book, ...s.books] })),

  removeBook: (bookId) =>
    set((s) => ({
      books: s.books.filter((b) => b.id !== bookId),
      readingBook: s.readingBook?.id === bookId ? null : s.readingBook,
    })),

  getBookById: (id) => get().books.find((b) => b.id === id),

  updateBookContent: (bookId, contentText, parsedChapters) =>
    set((s) => ({
      books: s.books.map((b) =>
        b.id === bookId
          ? { ...b, contentText, parsedChapters, annotations: b.annotations || [], highlights: b.highlights || [] }
          : b
      ),
      readingBook: s.readingBook?.id === bookId
        ? { ...s.readingBook, contentText, parsedChapters, annotations: s.readingBook.annotations || [], highlights: s.readingBook.highlights || [] }
        : s.readingBook,
    })),

  addAnnotation: (annotation) =>
    set((s) => ({
      books: s.books.map((b) =>
        b.id === annotation.bookId
          ? { ...b, annotations: [...(b.annotations || []), annotation] }
          : b
      ),
      readingBook: s.readingBook?.id === annotation.bookId
        ? { ...s.readingBook, annotations: [...(s.readingBook.annotations || []), annotation] }
        : s.readingBook,
    })),

  removeAnnotation: (annotationId) =>
    set((s) => ({
      books: s.books.map((b) =>
        b.annotations?.some((a) => a.id === annotationId)
          ? { ...b, annotations: b.annotations.filter((a) => a.id !== annotationId) }
          : b
      ),
      readingBook: s.readingBook?.annotations?.some((a) => a.id === annotationId)
        ? { ...s.readingBook, annotations: s.readingBook.annotations.filter((a) => a.id !== annotationId) }
        : s.readingBook,
    })),

  addHighlight: (highlight) =>
    set((s) => ({
      books: s.books.map((b) =>
        b.id === highlight.bookId
          ? { ...b, highlights: [...(b.highlights || []), highlight] }
          : b
      ),
      readingBook: s.readingBook?.id === highlight.bookId
        ? { ...s.readingBook, highlights: [...(s.readingBook.highlights || []), highlight] }
        : s.readingBook,
    })),

  removeHighlight: (highlightId) =>
    set((s) => ({
      books: s.books.map((b) =>
        b.highlights?.some((h) => h.id === highlightId)
          ? { ...b, highlights: b.highlights.filter((h) => h.id !== highlightId) }
          : b
      ),
      readingBook: s.readingBook?.highlights?.some((h) => h.id === highlightId)
        ? { ...s.readingBook, highlights: s.readingBook.highlights.filter((h) => h.id !== highlightId) }
        : s.readingBook,
    })),
}))