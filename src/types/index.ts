export interface Concept {
  id: string
  name: string
  pinyin: string
  shortDefinition: string
  detailedExplanation: string
  field: string
  relatedConcepts: string[]
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