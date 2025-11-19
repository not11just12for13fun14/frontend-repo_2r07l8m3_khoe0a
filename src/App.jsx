import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import SpinWheel from './components/SpinWheel'
import MapFlight from './components/MapFlight'
import TimerPanel from './components/TimerPanel'
import AirplaneTakeoff from './components/AirplaneTakeoff'
import { computeFlight } from './lib/api'

function App() {
  const [selected, setSelected] = useState(null)
  const [flight, setFlight] = useState(null)
  const [takingOff, setTakingOff] = useState(false)
  const [playing, setPlaying] = useState(false)

  const onStop = async (country) => {
    setSelected(country)
    setTakingOff(true)
    const data = await computeFlight(country)
    setFlight(data)
  }

  const onTakeoffEnd = () => {
    setTakingOff(false)
    setPlaying(true)
  }

  const onTimerDone = () => {
    setPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-sky-50">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(900px_500px_at_80%_120%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
      <div className="relative space-y-12 sm:space-y-16 px-4 sm:px-6 py-8 max-w-6xl mx-auto">
        <Hero />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <SpinWheel onStop={onStop} />
            <AirplaneTakeoff trigger={takingOff} onEnd={onTakeoffEnd} />
            {flight && (
              <div className="text-center text-sky-200/80">
                <p>Destination: <span className="text-white font-semibold">{flight.country}</span></p>
                <p className="text-sm opacity-80">Distance: {flight.distance_km} km • Flight time: {flight.duration_minutes} min</p>
              </div>
            )}
            <TimerPanel durationMinutes={flight?.duration_minutes || 0} running={playing} onDone={onTimerDone} />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
              <div className="text-sm text-sky-200/80 mb-2">Route</div>
              <MapFlight path={flight?.path || []} playing={playing} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="text-sm text-sky-200/80 mb-2">Focus Mode</div>
              <p className="text-sky-100/80">Enable DND, hide distractions, and enter a cozy cabin vibe while you study.</p>
            </div>
          </div>
        </div>

        <footer className="pt-6 pb-10 text-center text-xs text-sky-200/60">Built with love • Study Air</footer>
      </div>
    </div>
  )
}

export default App
