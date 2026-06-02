interface MobileMenuProps { open: boolean; closeMobile: () => void }
export default function MobileMenu({ open, closeMobile }: MobileMenuProps) {
  if (!open) {
return null
}

  return (
    <div className="absolute top-[72px] left-0 right-0 z-[999] bg-white/98 backdrop-blur-xl border-t-2 border-navy shadow-[0_8px_30px_rgba(27,48,145,0.12)] flex flex-col gap-5 px-[5%] pt-6 pb-8">
      <a href="#sports"   onClick={closeMobile} className="font-rajdhani font-bold text-xl tracking-[2px] uppercase text-dark border-b border-[rgba(27,48,145,0.12)] pb-4 hover:text-navy transition-colors">Sports</a>
      <a href="#schedule" onClick={closeMobile} className="font-rajdhani font-bold text-xl tracking-[2px] uppercase text-dark border-b border-[rgba(27,48,145,0.12)] pb-4 hover:text-navy transition-colors">Schedule</a>
      <a href="#reg-cta"  onClick={closeMobile} className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-gold to-gold-d text-navy-d font-rajdhani font-extrabold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(245,197,24,0.35)] border-0 cursor-pointer hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300">Register Now</a>
    </div>
  )
}
