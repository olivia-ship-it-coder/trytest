import type { Concept } from '@/types'

export interface ConceptMatch {
  concept: Concept
  startIndex: number
  endIndex: number
}

export function findConceptMatches(text: string, concepts: Concept[]): ConceptMatch[] {
  const sorted = [...concepts].sort((a, b) => b.name.length - a.name.length)
  const matches: ConceptMatch[] = []
  const occupied = new Set<number>()

  for (const concept of sorted) {
    let searchFrom = 0
    while (true) {
      const idx = text.indexOf(concept.name, searchFrom)
      if (idx === -1) break

      let overlap = false
      for (let i = idx; i < idx + concept.name.length; i++) {
        if (occupied.has(i)) {
          overlap = true
          break
        }
      }

      if (!overlap) {
        matches.push({ concept, startIndex: idx, endIndex: idx + concept.name.length })
        for (let i = idx; i < idx + concept.name.length; i++) {
          occupied.add(i)
        }
      }

      searchFrom = idx + 1
    }
  }

  matches.sort((a, b) => a.startIndex - b.startIndex)
  return matches
}