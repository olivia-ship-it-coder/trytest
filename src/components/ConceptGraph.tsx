import { useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import type { Concept } from '@/types'

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
}

interface SimLink {
  source: string
  target: string
}

const FIELD_COLORS: Record<string, string> = {
  '存在论': '#8B7355',
  '方法论': '#5B7B6A',
}

export default function ConceptGraph({ concepts, onSelect, selectedId }: ConceptGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const buildGraph = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'concept-tooltip')
      .style('display', 'none')

    const nodes: SimNode[] = concepts.map((c) => ({
      id: c.id,
      name: c.name,
      field: c.field,
      shortDefinition: c.shortDefinition,
      degree: 0,
    }))

    const nodeMap = new Map(nodes.map((n) => [n.id, n]))
    const links: SimLink[] = []

    const linkSet = new Set<string>()

    for (const c of concepts) {
      for (const relatedId of c.relatedConcepts) {
        const key = [c.id, relatedId].sort().join('-')
        if (!linkSet.has(key) && nodeMap.has(relatedId)) {
          linkSet.add(key)
          links.push({ source: c.id, target: relatedId })
          nodeMap.get(c.id)!.degree++
          nodeMap.get(relatedId)!.degree++
        }
      }
    }

    const degreeMax = Math.max(...nodes.map((n) => n.degree), 1)

    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id((d) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)
    svg.on('dblclick.zoom', null)

    const g = svg.append('g')

    const link = g.append('g')
      .selectAll<SVGLineElement, SimLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#D4C0AB')
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.6)

    const node = g.append('g')
      .selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

    node.append('circle')
      .attr('r', (d) => 14 + (d.degree / degreeMax) * 12)
      .attr('fill', (d) => FIELD_COLORS[d.field] || '#8B7355')
      .attr('stroke', (d) => d.id === selectedId ? '#8B2500' : '#fff')
      .attr('stroke-width', (d) => d.id === selectedId ? 3 : 1.5)
      .attr('opacity', 0.9)
      .style('filter', 'drop-shadow(0 2px 3px rgba(74,55,40,0.2))')
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

    node
      .on('mouseenter', function (event, d) {
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('opacity', 1)
          .attr('stroke', '#8B2500')
          .attr('stroke-width', 3)

        const rect = containerRef.current!.getBoundingClientRect()
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
        const rect = containerRef.current!.getBoundingClientRect()
        tooltip
          .style('left', `${event.offsetX + 16}px`)
          .style('top', `${event.offsetY - 10}px`)
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).select('circle')
          .transition().duration(200)
          .attr('opacity', 0.9)
          .attr('stroke', d.id === selectedId ? '#8B2500' : '#fff')
          .attr('stroke-width', d.id === selectedId ? 3 : 1.5)
        tooltip.style('display', 'none')
      })
      .on('click', function (event, d) {
        event.stopPropagation()
        onSelect(d.id)
      })

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => ((d.source as unknown) as SimNode).x!)
        .attr('y1', (d) => ((d.source as unknown) as SimNode).y!)
        .attr('x2', (d) => ((d.target as unknown) as SimNode).x!)
        .attr('y2', (d) => ((d.target as unknown) as SimNode).y!)

      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })

    return () => {
      simulation.stop()
      tooltip.remove()
    }
  }, [concepts, onSelect, selectedId])

  useEffect(() => {
    const cleanup = buildGraph()
    return () => cleanup?.()
  }, [buildGraph])

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] w-full overflow-hidden rounded-xl border border-leather-200 bg-white/70 shadow-book"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="cursor-grab active:cursor-grabbing"
      />
      <style>{`
        .concept-tooltip {
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