interface NavbarProps {
  mobileOpen: boolean
  setMobileOpen: (fn: (o: boolean) => boolean) => void
}
export default function Navbar({ mobileOpen, setMobileOpen }: NavbarProps) {
  return (
    <nav className="relative z-[1000] px-[5%] flex items-center justify-center h-[72px] bg-white shadow-[0_2px_16px_rgba(27,48,145,0.10)] border-b border-[rgba(27,48,145,0.08)]">
      <div className="flex items-center gap-10 max-md:gap-3">
        <img src="/images/nhps.png"    alt="NHPS" className="h-[110px] max-md:h-[50px] w-auto object-contain" />
        <img src="/images/gurukul.png" alt="NHG"  className="h-[110px] max-md:h-[50px] w-auto object-contain" />
        <img src="/images/nhis.png"    alt="NHIS" className="h-[110px] max-md:h-[50px] w-auto object-contain" />
      </div>
      <button
        className={`md:hidden ml-auto flex flex-col gap-[5px] cursor-pointer p-1 ${mobileOpen ? '[&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-[7px] [&>span:nth-child(3)]:-rotate-45' : ''}`}
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className="block w-[26px] h-0.5 bg-navy rounded-sm transition-all duration-300" />
        <span className="block w-[26px] h-0.5 bg-navy rounded-sm transition-all duration-300" />
        <span className="block w-[26px] h-0.5 bg-navy rounded-sm transition-all duration-300" />
      </button>
    </nav>
  )
}
