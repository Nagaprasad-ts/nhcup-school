import { Link } from '@inertiajs/react'

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page2 flex flex-col">

      {/* Navbar */}
      <nav className="relative z-[1000] px-[5%] flex items-center justify-between h-[72px] max-md:h-[64px] bg-white shadow-[0_2px_16px_rgba(27,48,145,0.10)] border-b border-[rgba(27,48,145,0.08)]">
        <div className="flex items-center gap-10 max-md:gap-2.5">
          <img src="/images/nhps.png"    alt="NHPS" className="h-[52px] max-md:h-[44px] max-[480px]:h-[38px] w-auto object-contain" />
          <img src="/images/gurukul.png" alt="NHG"  className="h-[52px] max-md:h-[44px] max-[480px]:h-[38px] w-auto object-contain" />
          <img src="/images/nhis.png"    alt="NHIS" className="h-[52px] max-md:h-[44px] max-[480px]:h-[38px] w-auto object-contain" />
        </div>
        <Link href="/" className="inline-flex items-center gap-2 font-rajdhani font-bold text-[0.95rem] max-md:text-[0.82rem] tracking-[1.5px] uppercase text-navy border-2 border-navy px-5 max-md:px-3.5 py-2 rounded-full transition-all hover:bg-navy hover:text-white hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)]">
          <i className="fas fa-home" /> Home
        </Link>
      </nav>

      {/* Page content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-[#0a1240] border-t-[3px] border-gold py-5 px-[5%] text-center">
        <p className="font-rajdhani text-[0.82rem] text-white/30">
          © 2026 NHCUP — New Horizon College, Bangalore. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
