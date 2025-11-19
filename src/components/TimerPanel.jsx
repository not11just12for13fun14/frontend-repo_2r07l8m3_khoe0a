import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlarmClock, Crown, Flame, Lock } from 'lucide-react'

function msToHMS(ms){
  const total = Math.max(0, Math.floor(ms/1000))
  const h = Math.floor(total/3600)
  const m = Math.floor((total%3600)/60)
  const s = total%60
  return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':')
}

export default function TimerPanel({ durationMinutes = 0, running, onDone }){
  const [endAt, setEndAt] = useState(null)
  const [now, setNow] = useState(Date.now())
  const durationMs = durationMinutes * 60 * 1000

  useEffect(()=>{
    const saved = localStorage.getItem('study-air-endAt')
    if (saved) setEndAt(parseInt(saved))
  },[])

  useEffect(()=>{
    let t
    if (running && durationMs>0){
      const target = Date.now() + durationMs
      setEndAt(target)
      localStorage.setItem('study-air-endAt', String(target))
      t = setInterval(()=>setNow(Date.now()), 250)
    } else {
      t = setInterval(()=>setNow(Date.now()), 1000)
    }
    return ()=>clearInterval(t)
  },[running, durationMs])

  const remaining = useMemo(()=>{
    if (!endAt) return 0
    return Math.max(0, endAt - now)
  },[endAt, now])

  useEffect(()=>{
    if (endAt && remaining===0){
      localStorage.removeItem('study-air-endAt')
      onDone?.()
    }
  },[endAt, remaining, onDone])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 text-sky-300">
            <AlarmClock size={18} />
            <span className="text-sm uppercase tracking-wider">In-flight focus</span>
          </div>
          <div className="inline-flex items-center gap-2 text-amber-300">
            <Flame size={18} />
            <span className="text-sm">Streak: 3</span>
          </div>
        </div>
        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="text-center">
          <div className="text-[42px] sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            {msToHMS(remaining)}
          </div>
          <p className="mt-2 text-xs text-sky-100/70">Auto-saves in localStorage. Close the tab, your timer continues.</p>
        </motion.div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xs text-sky-200/80">Focus</div>
            <div className="text-sm text-white/90">On</div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xs text-sky-200/80">Achievements</div>
            <div className="text-sm inline-flex items-center gap-1 text-white/90"><Crown size={14}/> 5</div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
            <div className="text-xs text-sky-200/80">Mode</div>
            <div className="text-sm inline-flex items-center gap-1 text-white/90"><Lock size={14}/> Focus</div>
          </div>
        </div>
      </div>
    </div>
  )
}
