import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import type { Concept, ConceptRelation } from '@/types'
import { conceptGraphLayout } from '@/data/conceptGraphLayout'

interface ConceptGraphProps {
  concepts: Concept[]
  onSelect: (id: string) => void
  selectedId?: string | null
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string
  name: string
  field: string
  shortDefinition: string
  degree: number
  sector: number
  depth: number
  relations: ConceptRelation[]
  px: number
  py: number
}

interface SimLink {
  source: string
  target: string
  type: 'contains' | 'derives' | 'opposes' | 'method'
}

const SECTOR_COLORS = [
  'rgba(139, 115, 85, 0.08)',
  'rgba(169, 38, 42, 0.08)',
  'rgba(91, 123, 106, 0.08)',
  'rgba(90, 105, 130, 0.08)',
]

const SECTOR_LABELS = [
  '基础存在论结构',
  '日常性与真实性',
  '时间性',
  '方法论与事物',
]

const RELATION_STYLES: Record<string, { stroke: string; dash: string; label: string }> = {
  contains: { stroke: '#7A6A48', dash: '', label: '包含' },
  derives: { stroke: '#8B2500', dash: '5,4', label: '导出' },
  opposes: { stroke: '#5B7B6A', dash: '3,4', label: '对立' },
  method: { stroke: '#5A6982', dash: '1,4', label: '方法' },
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function ConceptGraph({ concepts, onSelect, selectedId }: ConceptGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const cx = width / 2
    const cy = height / 2
    const maxR = Math.min(width, height) * 0.38

    const svg = d3.select(svgRef.current)
    const g = svg.append('g').attr('class', 'main-group')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on('zoom', (event) => g.attr('transform', event.transform))
    svg.call(zoom)
    svg.on('dblclick.zoom', null)

    // ── Sector background wedges ──
    for (let i = 0; i < 4; i++) {
      const startAngle = (i * 90 - 90) * (Math.PI / 180)
      const endAngle = ((i + 1) * 90 - 90) * (Math.PI / 180)
      const arc = d3.arc<any>()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) * 0.48)
        .startAngle(startAngle)
        .endAngle(endAngle)
      g.append('path')
        .attr('d', arc as any)
        .attr('fill', SECTOR_COLORS[i])
        .attr('stroke', 'rgba(74,55,40,0.05)')
        .attr('stroke-width', 1)
    }

    // ── Sector labels ──
    for (let i = 0; i < 4; i++) {
      const midAngle = i * 90
      const labelR = Math.min(width, height) * 0.44
      const pos = polarToCartesian(cx, cy, labelR, midAngle)
      g.append('text')
        .attr('x', pos.x)
        .attr('y', pos.y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', '"Noto Sans SC", sans-serif')
        .attr('fill', 'rgba(74,55,40,0.2)')
        .attr('font-weight', '500')
        .style('pointer-events', 'none')
        .text(SECTOR_LABELS[i])
    }

    // ── Concentric rings ──
    for (let d = 1; d <= 4; d++) {
      const r = (d / 4) * maxR
      g.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(74,55,40,0.06)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4')
    }

    // ── Build nodes ──
    const nodes: SimNode[] = concepts.map((c) => {
      const layout = conceptGraphLayout[c.id]
      const angleOffset = layout ? layout.sector * 90 : 0
      const angleWithin = layout ? 10 + Math.random() * 70 : Math.random() * 360
      const radius = layout
        ? ((layout.depth + 1) / 5) * maxR
        : Math.random() * maxR
      const pos = polarToCartesian(cx, cy, radius, angleOffset + angleWithin)
      const degree = c.relatedConcepts.length
      return {
        id: c.id,
        name: c.name,
        field: c.field,
        shortDefinition: c.shortDefinition,
        degree,
        sector: layout?.sector ?? 0,
        depth: layout?.depth ?? 2,
        relations: layout?.relations ?? [],
        x: pos.x,
        y: pos.y,
        px: pos.x,
        py: pos.y,
      }
    })

    const nodeMap = new Map(nodes.map((n) => [n.id, n]))

    // ── Build links from relations ──
    const links: SimLink[] = []
    const linkSet = new Set<string>()
    for (const node of nodes) {
      for (const rel of node.relations) {
        const key = [node.id, rel.target].sort().join('-')
        if (!linkSet.has(key) && nodeMap.has(rel.target)) {
          linkSet.add(key)
          links.push({ source: node.id, target: rel.target, type: rel.type })
        }
      }
    }

    // ── Tooltip ──
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'graph-tooltip')
      .style('display', 'none')

    // ── Draw links ──
    const link = g.append('g')
      .selectAll<SVGLineElement, SimLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => RELATION_STYLES[d.type]?.stroke || '#999')
      .attr('stroke-width', (d) => d.type === 'contains' ? 2 : 1.5)
      .attr('stroke-dasharray', (d) => RELATION_STYLES[d.type]?.dash || '')
      .attr('stroke-opacity', 0.5)
      .attr('marker-end', (d) => d.type === 'derives' ? 'url(#arrow)' : '')

    // ── Arrow marker ──
    const defs = svg.append('defs')
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 20)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L10,5 L0,10 Z')
      .attr('fill', '#8B2500')

    // ── Draw nodes ──
    const node = g.append('g')
      .selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on('start', (event, d) => {
            if (!event.active) {
              const sim = d3.forceSimulation(nodes)
                .alphaTarget(0.3).restart()
              setTimeout(() => sim.stop(), 2000)
            }
            d.fx = d.x; d.fy = d.y
          })
          .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y })
          .on('end', (event, d) => {
            if (!event.active) d3.forceSimulation(nodes).alphaTarget(0)
            d.fx = null; d.fy = null
          })
      )

    node.append('circle')
      .attr('r', (d) => 12 + (d.degree / 8) * 10)
      .attr('fill', (d) => {
        const sectorColors = ['#8B7355', '#A9262A', '#5B7B6A', '#5A6982']
        return sectorColors[d.sector] || '#8B7355'
      })
      .attr('stroke', (d) => d.id === selectedId ? '#8B2500' : '#fff')
      .attr('stroke-width', (d) => d.id === selectedId ? 3 : 2)
      .style('filter', 'drop-shadow(0 2px 6px rgba(74,55,40,0.25))')
      .style('transition', 'stroke 0.2s')

    node.append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-size', (d) => d.name.length > 2 ? '11px' : '13px')
      .attr('font-weight', '600')
      .attr('font-family', '"Noto Sans SC", sans-serif')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 3px rgba(0,0,0,0.3)')

    // ── Node interactions ──
    node
      .on('mouseenter', function (event, d) {
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('stroke', '#8B2500')
          .attr('stroke-width', 3)

        tooltip
          .style('display', 'block')
          .style('left', `${event.offsetX + 16}px`)
          .style('top', `${event.offsetY - 10}px`)
          .html(`
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:#3D3223">${d.name}</div>
            <div style="font-size:11px;color:#7A6A48;margin-bottom:4px">${d.field}</div>
            <div style="font-size:12px;color:#5C4F37;line-height:1.5">${d.shortDefinition}</div>
          `)
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', `${event.offsetX + 16}px`)
          .style('top', `${event.offsetY - 10}px`)
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('stroke', d.id === selectedId ? '#8B2500' : '#fff')
          .attr('stroke-width', d.id === selectedId ? 3 : 2)
        tooltip.style('display', 'none')
      })
      .on('click', function (event, d) {
        event.stopPropagation()
        onSelect(d.id)
      })

    // ── Legend ──
    const legend = svg.append('g')
      .attr('transform', `translate(16, ${height - 120})`)

    const legendBg = legend.append('rect')
      .attr('width', 170)
      .attr('height', 106)
      .attr('rx', 6)
      .attr('fill', 'rgba(250,247,242,0.9)')
      .attr('stroke', '#D4C0AB')
      .attr('stroke-width', 1)

    legend.append('text')
      .attr('x', 10).attr('y', 18)
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#5C4F37')
      .attr('font-family', '"Noto Sans SC", sans-serif')
      .text('关系类型')

    const legendItems = [
      { label: '包含/隶属', stroke: '#7A6A48', dash: '' },
      { label: '导出/推导', stroke: '#8B2500', dash: '5,4' },
      { label: '对立/对比', stroke: '#5B7B6A', dash: '3,4' },
      { label: '方法依赖', stroke: '#5A6982', dash: '1,4' },
    ]

    legendItems.forEach((item, i) => {
      const y = 32 + i * 18
      legend.append('line')
        .attr('x1', 10).attr('y1', y)
        .attr('x2', 40).attr('y2', y)
        .attr('stroke', item.stroke)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', item.dash)
      legend.append('text')
        .attr('x', 46).attr('y', y + 4)
        .attr('font-size', '10px')
        .attr('fill', '#7A6A48')
        .attr('font-family', '"Noto Sans SC", sans-serif')
        .text(item.label)
    })

    return () => {
      svg.selectAll('*').remove()
      tooltip.remove()
    }
  }, [concepts, onSelect, selectedId])

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] w-full overflow-hidden rounded-xl border border-leather-200 bg-white/80 shadow-book"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="cursor-grab active:cursor-grabbing"
      />
      <style>{`
        .graph-tooltip {
          position: absolute;
          background: #FAF7F2;
          border: 1px solid #D4C0AB;
          border-radius: 8px;
          padding: 10px 14px;
          max-width: 260px;
          box-shadow: 0 4px 16px rgba(74,55,40,0.12);
          pointer-events: none;
          z-index: 100;
        }
      `}</style>
    </div>
  )
}