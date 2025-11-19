import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-2xl">
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Welcome to</p>
          <h1 className="mt-2 text-4xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Study Air
          </h1>
          <p className="mt-4 max-w-xl text-sky-100/80">Spin the globe, catch a flight, and focus while you fly. A cozy, glassy study experience inspired by travel.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-20%,rgba(56,189,248,0.25),transparent),radial-gradient(600px_300px_at_80%_120%,rgba(59,130,246,0.2),transparent)]" />
    </section>
  )
}
