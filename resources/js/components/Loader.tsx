import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2200)

    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-[opacity,visibility] duration-500 ${hidden ? 'opacity-0 invisible' : ''}`}>
      <img src="/images/nhcup_logo.png" alt="NHCUP 2026" className="w-32 h-auto animate-pulse-logo drop-shadow-[0_4px_20px_rgba(27,48,145,0.3)]" />
      <div className="w-64 h-1 bg-page3 rounded-sm mt-7 overflow-hidden">
        <div className="h-full w-0 bg-gradient-to-r from-navy to-sky rounded-sm animate-load-fill" />
      </div>
      <p className="mt-3.5 font-rajdhani text-base tracking-[3px] text-muted uppercase animate-text-blink">Loading...</p>
    </div>
  )
}
