import { create } from 'zustand'
import type { Book, Chapter, Section } from '@/types'
import { libraryBooks } from '@/data/libraryBooks'

interface BookState {
  books: Book[]
  readingBook: Book | null
  currentChapterId: string | null
  currentSectionId: string | null
  showTOC: boolean
  showSearchModal: boolean
  showUploadModal: boolean

  setReadingBook: (book: Book | null) => void
  setCurrentChapter: (chapterId: string) => void
  setCurrentSection: (sectionId: string | null) => void
  toggleTOC: () => void
  setShowSearchModal: (show: boolean) => void
  setShowUploadModal: (show: boolean) => void
  addUploadedBook: (book: Book) => void
  removeBook: (bookId: string) => void
  getBookById: (id: string) => Book | undefined
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [...libraryBooks],
  readingBook: null,
  currentChapterId: null,
  currentSectionId: null,
  showTOC: true,
  showSearchModal: false,
  showUploadModal: false,

  setReadingBook: (book) =>
    set({
      readingBook: book,
      currentChapterId: book?.chapters[0]?.id ?? null,
      currentSectionId: book?.chapters[0]?.sections[0]?.id ?? null,
      showTOC: true,
    }),

  setCurrentChapter: (chapterId) =>
    set({ currentChapterId: chapterId, currentSectionId: null }),

  setCurrentSection: (sectionId) =>
    set({ currentSectionId: sectionId }),

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
}))