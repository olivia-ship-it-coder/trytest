export interface ConceptRelation {
  target: string
  type: 'contains' | 'derives' | 'opposes' | 'method'
}

export interface Concept {
  id: string
  name: string
  pinyin: string
  shortDefinition: string
  detailedExplanation: string
  field: string
  relatedConcepts: string[]
  relations?: ConceptRelation[]
  sector?: number
  depth?: number
  source: string
}

export interface Paragraph {
  id: string
  chapter: string
  section: string
  content: string
  relatedConcepts: string[]
  analysis: string
}

export interface TranslationParagraph {
  id: string
  content: string
  paragraphIndex: number
}

export interface Translation {
  id: string
  name: string
  translator: string
  publisher: string
  year: number
  paragraphs: TranslationParagraph[]
}

export interface Section {
  id: string
  title: string
}

export interface ParsedChapter {
  id: string
  title: string
  level: number
  startIndex: number
  endIndex: number
}

export interface Chapter {
  id: string
  title: string
  sections: Section[]
}

export interface Annotation {
  id: string
  bookId: string
  chapterId: string
  text: string
  startOffset: number
  endOffset: number
  color: string
  note: string
  createdAt: Date
}

export interface Highlight {
  id: string
  bookId: string
  chapterId: string
  startOffset: number
  endOffset: number
  color: string
}

export interface Book {
  id: string
  title: string
  author: string
  coverColor: string
  coverImage?: string
  description: string
  chapters: Chapter[]
  parsedChapters?: ParsedChapter[]
  source: 'library' | 'upload'
  fileData?: string
  fileName?: string
  fileSize?: number
  fileType?: string
  uploadedAt?: number
  annotations?: Annotation[]
  highlights?: Highlight[]
  contentText?: string
}