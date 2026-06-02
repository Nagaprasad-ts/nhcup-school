import { useEffect, useState } from 'react'
import { useCountdown } from '@/hooks/useCountdown'

export default function Hero() {
  const { timeLeft, label } = useCountdown()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)

    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const handler = () => {
      const hero = document.getElementById('hero')
      
      if (hero) {
        hero.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handler)
    
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const bgImage = isMobile ? '/images/mobile_banner.png' : '/images/main_banner.png'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(5,10,40,0.88) 0%, rgba(5,10,40,0.65) 45%, rgba(5,10,40,0.10) 100%)' }} />
      <div className="relative z-[2] w-[70%] max-md:w-full px-[8%] max-md:px-[6%] pt-10 pb-20 flex flex-col items-start max-md:items-center gap-5 max-md:text-center">
        {/* Title row */}
        <div className="flex items-center gap-6 max-md:flex-col max-md:items-center">
          <img src="/images/nhcup_logo.png" alt="NHCUP 2026" className="h-32 max-md:h-[90px] w-auto shrink-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]" />
          <h1 className="font-orbitron text-[46px] max-md:text-[clamp(1.8rem,7vw,2.8rem)] max-[480px]:text-[26px] max-[480px]:leading-10 font-black leading-tight text-white tracking-tight m-0">
            State Level Inter-School<br />
            <span className="bg-linear-to-br from-sky to-gold bg-clip-text text-transparent">Sports Championship</span>
          </h1>
        </div>
        {/* Subtitle */}
        <p className="text-base max-md:text-[0.95rem] leading-[1.75] text-white/70 max-w-[680px] m-0">
          The ultimate battle of pride &amp; sportsmanship. 11 sports disciplines, 50+ schools, 1200+ athletes across Bangalore's finest campuses.
        </p>
        {/* Countdown */}
        <div className="mt-0">
          <p className="font-rajdhani text-xl font-bold tracking-[3px] uppercase text-white/90 mb-3">{label}</p>
          <div className="flex gap-2.5 flex-wrap max-md:justify-center max-md:flex-nowrap">
            {[{ val: timeLeft.d, unit: 'Days' }, { val: timeLeft.h, unit: 'Hours' }, { val: timeLeft.m, unit: 'Mins' }, { val: timeLeft.s, unit: 'Secs' }].map(({ val, unit }) => (
              <div key={unit} className="bg-white/10 border border-white/20 rounded-[10px] p-3.5 w-[100px] max-md:w-[72px] max-[480px]:w-[62px] shrink-0 text-center">
                <span className="font-orbitron text-[2rem] max-md:text-[1.6rem] max-[480px]:text-[1.3rem] font-bold text-white leading-none block tabular-nums">{val}</span>
                <span className="font-rajdhani text-[0.65rem] max-[480px]:text-[0.55rem] tracking-[2px] max-[480px]:tracking-[1px] uppercase text-white/50 mt-1.5 block">{unit}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-3.5 flex-wrap max-md:flex-col max-md:items-center max-md:w-full">
          <a href="#sports" className="inline-flex items-center gap-2.5 bg-linear-to-br from-gold to-gold-d text-navy-d font-rajdhani font-extrabold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(245,197,24,0.35)] border-0 cursor-pointer hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(245,197,24,0.55)] transition-all duration-300 max-md:w-full max-md:max-w-[340px] max-md:justify-center">
            <i className="fas fa-trophy" /> Register Your Team
          </a>
          <a href="#schedule" className="inline-flex items-center gap-2.5 bg-transparent font-rajdhani font-bold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full border-2 border-white/50 text-white cursor-pointer hover:bg-white/12 hover:border-white transition-all duration-300 max-md:w-full max-md:max-w-[340px] max-md:justify-center">
            <i className="fas fa-calendar-alt" /> View Schedule
          </a>
        </div>
      </div>
    </section>
  )
}
