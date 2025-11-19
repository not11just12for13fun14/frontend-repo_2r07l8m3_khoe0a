import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Play } from 'lucide-react'

const sectors = [
  'United States','United Kingdom','France','Germany','Japan','Australia','Brazil','South Africa','Canada','Singapore'
]

export default function SpinWheel({ onStop }) {
  const wheelRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const controls = useAnimation()

  const spin = async () => {
    if (spinning) return
    setSpinning(true)
    const rounds = 6 + Math.floor(Math.random() * 4)
    const finalDeg = rounds * 360 + Math.floor(Math.random() * 360)
    await controls.start({ rotate: finalDeg, transition: { duration: 4, ease: [0.16, 1, 0.3, 1] } })
    setSpinning(false)

    // Determine selected sector
    const normalized = ((finalDeg % 360) + 360) % 360
    const per = 360 / sectors.length
    const index = Math.floor((sectors.length - normalized / per) % sectors.length)
    const country = sectors[index]
    onStop?.(country)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative aspect-square rounded-full p-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <motion.div ref={wheelRef} animate={controls} className="relative w-full h-full rounded-full overflow-hidden">
          {sectors.map((label, i) => {
            const start = (i * 360) / sectors.length
            return (
              <div
                key={i}
                className="absolute inset-0 origin-center"
                style={{ transform: `rotate(${start}deg)` }}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-1/2 bg-gradient-to-b from-sky-400/60 to-transparent" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[2px] text-[11px] sm:text-xs font-semibold tracking-wide text-sky-100/90" style={{ transform: 'rotate(90deg)', transformOrigin: 'top center' }}>
                  {label}
                </div>
              </div>
            )
          })}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

      <button onClick={spin} className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white px-5 py-2.5 shadow-lg shadow-sky-500/30 transition-colors">
        <Play size={16} /> Spin
      </button>
    </div>
  )
}
