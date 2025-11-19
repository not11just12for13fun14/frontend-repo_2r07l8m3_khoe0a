import { useEffect, useMemo, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Plane } from 'lucide-react'

function latLonToXY(lat, lon, w, h){
  // Equirectangular projection for simplicity
  const x = ((lon + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return { x, y }
}

export default function MapFlight({ path = [], playing }){
  const controls = useAnimation()
  const svgRef = useRef(null)

  const points = useMemo(() => path.map(p => ({ ...p })), [path])

  useEffect(() => {
    const animate = async () => {
      if (!points.length) return
      await controls.start({ progress: 0 })
      await controls.start({ progress: 1, transition: { duration: Math.min(16, Math.max(4, points.length/8)), ease: 'easeInOut' } })
    }
    if (playing) animate()
  }, [playing, points, controls])

  const w = 900, h = 450
  const d = points.map((p, i) => {
    const { x, y } = latLonToXY(p.lat, p.lon, w, h)
    return `${i===0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-4 shadow-2xl">
      <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} className="w-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950">
        <defs>
          <linearGradient id="trail" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* World grid */}
        <g opacity="0.2">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`v${i}`} x1={(i+1)*50} x2={(i+1)*50} y1="0" y2={h} stroke="#0ea5e9" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} y1={(i+1)*50} y2={(i+1)*50} x1="0" x2={w} stroke="#60a5fa" strokeWidth="0.5" />
          ))}
        </g>

        {/* Path */}
        {d && (
          <>
            <path d={d} stroke="url(#trail)" strokeWidth="3" fill="none" filter="url(#glow)" />
            <motion.circle r="6" fill="#38bdf8" filter="url(#glow)" animate={controls} initial={{ progress: 0 }}>
              <animateMotion dur="0s" path={d} />
            </motion.circle>
          </>
        )}
      </svg>
    </div>
  )
}
