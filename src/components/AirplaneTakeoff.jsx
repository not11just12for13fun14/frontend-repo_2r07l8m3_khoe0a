import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AirplaneTakeoff({ trigger, onEnd }){
  useEffect(()=>{
    // no-op, controlled by AnimatePresence
  },[trigger])

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative h-40 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center shadow-2xl"
        >
          <motion.div
            initial={{ x: -120, y: 40, rotate: -10, opacity: 0 }}
            animate={{ x: 160, y: -60, rotate: 8, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16,1,0.3,1] }}
            onAnimationComplete={onEnd}
            className="w-24 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.6)]"
          >
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-white/80" />
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-[2px] bg-white/50" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(300px_120px_at_60%_0%,rgba(56,189,248,0.25),transparent)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
