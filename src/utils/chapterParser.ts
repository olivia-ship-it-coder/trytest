import type { ParsedChapter } from '../types'

export function parseChapters(text: string): ParsedChapter[] {
  const chapters: ParsedChapter[] = []
  
  const patterns = [
    // 中文章节：第X章/节/篇/卷，匹配开头
    {
      regex: /^第[一二三四五六七八九十百千万\d]+[章节篇卷].*$/gm,
      level: 1
    },
    // 中文小节：第X节
    {
      regex: /^第[一二三四五六七八九十百千万\d]+节.*$/gm,
      level: 2
    },
    // Chapter X
    {
      regex: /^Chapter\s+\d+.*$/gim,
      level: 1
    },
    // §符号
    {
      regex: /^§\s*\d+.*$/gm,
      level: 1
    },
  ]

  const matches: Array<{
    index: number
    text: string
    level: number
  }> = []

  // 收集所有匹配项
  for (const { regex, level } of patterns) {
    let match
    const regexCopy = new RegExp(regex.source, regex.flags)
    while ((match = regexCopy.exec(text)) !== null) {
      matches.push({
        index: match.index,
        text: match[0].trim(),
        level
      })
    }
  }

  // 按位置排序
  matches.sort((a, b) => a.index - b.index)

  // 生成章节对象
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i]
    const next = matches[i + 1]
    
    chapters.push({
      id: `chapter-${i}`,
      title: current.text,
      level: current.level,
      startIndex: current.index,
      endIndex: next ? next.index : text.length
    })
  }

  // 如果没有检测到章节，添加一个默认的全文章节
  if (chapters.length === 0) {
    chapters.push({
      id: 'chapter-0',
      title: '全文',
      level: 1,
      startIndex: 0,
      endIndex: text.length
    })
  }

  return chapters
}
