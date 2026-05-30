import type { ConceptRelation } from '@/types'

export interface GraphNodeLayout {
  sector: number
  depth: number
  relations: ConceptRelation[]
}

export const conceptGraphLayout: Record<string, GraphNodeLayout> = {
  // ── Sector 0: 基础存在论结构 (0°-90°, 右上) ──
  sein: {
    sector: 0, depth: 0,
    relations: [
      { target: 'seiendes', type: 'contains' },
      { target: 'dasein', type: 'derives' },
    ],
  },
  dasein: {
    sector: 0, depth: 1,
    relations: [
      { target: 'sein', type: 'derives' },
      { target: 'in-der-welt-sein', type: 'contains' },
      { target: 'sorge', type: 'derives' },
      { target: 'vorhandenheit', type: 'derives' },
      { target: 'zuhandenheit', type: 'derives' },
    ],
  },
  seiendes: {
    sector: 0, depth: 2,
    relations: [
      { target: 'dasein', type: 'contains' },
    ],
  },
  'in-der-welt-sein': {
    sector: 0, depth: 2,
    relations: [
      { target: 'verfallen', type: 'contains' },
      { target: 'dasein', type: 'derives' },
    ],
  },
  sorge: {
    sector: 0, depth: 3,
    relations: [
      { target: 'zeitlichkeit', type: 'derives' },
      { target: 'dasein', type: 'derives' },
    ],
  },

  // ── Sector 1: 日常性与真实性 (90°-180°, 左上) ──
  verfallen: {
    sector: 1, depth: 2,
    relations: [
      { target: 'uneigentlichkeit', type: 'contains' },
      { target: 'eigentlichkeit', type: 'opposes' },
    ],
  },
  uneigentlichkeit: {
    sector: 1, depth: 3,
    relations: [
      { target: 'eigentlichkeit', type: 'opposes' },
      { target: 'verfallen', type: 'derives' },
    ],
  },
  angst: {
    sector: 1, depth: 3,
    relations: [
      { target: 'sein-zum-tode', type: 'derives' },
      { target: 'dasein', type: 'derives' },
    ],
  },
  'sein-zum-tode': {
    sector: 1, depth: 4,
    relations: [
      { target: 'eigentlichkeit', type: 'derives' },
      { target: 'angst', type: 'derives' },
    ],
  },
  eigentlichkeit: {
    sector: 1, depth: 4,
    relations: [
      { target: 'uneigentlichkeit', type: 'opposes' },
      { target: 'gewissen', type: 'derives' },
      { target: 'sein-zum-tode', type: 'derives' },
    ],
  },
  gewissen: {
    sector: 1, depth: 4,
    relations: [
      { target: 'eigentlichkeit', type: 'derives' },
      { target: 'dasein', type: 'derives' },
    ],
  },

  // ── Sector 2: 时间性 (180°-270°, 左下) ──
  zeitlichkeit: {
    sector: 2, depth: 2,
    relations: [
      { target: 'ekstase', type: 'contains' },
      { target: 'sorge', type: 'derives' },
    ],
  },
  ekstase: {
    sector: 2, depth: 3,
    relations: [
      { target: 'zeitlichkeit', type: 'contains' },
    ],
  },

  // ── Sector 3: 方法论与事物 (270°-360°, 右下) ──
  phaenomenologie: {
    sector: 3, depth: 2,
    relations: [
      { target: 'hermeneutischer-zirkel', type: 'method' },
      { target: 'sein', type: 'method' },
    ],
  },
  'hermeneutischer-zirkel': {
    sector: 3, depth: 3,
    relations: [
      { target: 'phaenomenologie', type: 'method' },
    ],
  },
  vorhandenheit: {
    sector: 3, depth: 4,
    relations: [
      { target: 'zuhandenheit', type: 'opposes' },
      { target: 'dasein', type: 'derives' },
    ],
  },
  zuhandenheit: {
    sector: 3, depth: 4,
    relations: [
      { target: 'vorhandenheit', type: 'opposes' },
      { target: 'dasein', type: 'derives' },
    ],
  },
}