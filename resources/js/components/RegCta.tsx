export default function RegCta() {
  return (
    <section id="reg-cta" className="py-[90px] px-[8%] relative overflow-hidden bg-gradient-to-br from-navy-d via-navy to-[#1e3fad]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 max-md:grid-cols-1 gap-[60px] max-md:gap-10 items-center relative z-[1]">

        <div className="reveal-left">
          <span className="inline-block font-rajdhani font-bold text-[0.8rem] tracking-[4px] uppercase text-gold bg-gold/10 border border-gold/25 px-[18px] py-1 rounded-full mb-5">Join the Battle</span>
          <h2 className="font-orbitron text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight text-white mb-5">
            Ready to<br /><span className="bg-gradient-to-br from-sky to-gold bg-clip-text text-transparent">Compete?</span>
          </h2>
          <p className="text-base leading-[1.8] text-white/70 mb-8 max-w-[480px]">
            Secure your spot at NHCUP 2026 — the premier inter-school sports championship across Bangalore's finest campuses.
          </p>
          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="font-inter text-[1.8rem] font-black text-gold">11</span>
              <span className="font-rajdhani text-[0.85rem] tracking-[2px] uppercase text-white/60">Sports</span>
            </div>
            <div className="w-px bg-white/15 self-stretch" />
            <div className="flex flex-col gap-1">
              <span className="font-inter text-[1.8rem] font-black text-gold">50+</span>
              <span className="font-rajdhani text-[0.85rem] tracking-[2px] uppercase text-white/60">Schools</span>
            </div>
            <div className="w-px bg-white/15 self-stretch" />
            <div className="flex flex-col gap-1">
              <span className="font-inter text-[1.8rem] font-black text-gold">1200+</span>
              <span className="font-rajdhani text-[0.85rem] tracking-[2px] uppercase text-white/60">Athletes</span>
            </div>
          </div>
        </div>

        <div className="reveal-right flex justify-center max-md:justify-center">
          <div className="bg-white rounded-[20px] p-9 w-full max-w-[400px] flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-1">
              <i className="fas fa-trophy text-gold text-xl" />
              <span className="font-orbitron font-bold text-dark text-[1.1rem] tracking-[1px]">NHCUP 2026</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 bg-black/5 p-2.5 rounded-[20px]">
                <div className="font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted flex items-center gap-2"><i className="fas fa-flag text-navy" /> Registration Opens</div>
                <div className="font-rajdhani font-extrabold text-[0.9rem] text-dark">15 Jun 2026</div>
              </div>
              <div className="flex items-center justify-between gap-3 bg-black/5 p-2.5 rounded-[20px]">
                <div className="font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted flex items-center gap-2"><i className="fas fa-hourglass-end text-navy" /> Registration Closes</div>
                <div className="font-rajdhani font-extrabold text-[0.9rem] text-dark">24 Aug 2026</div>
              </div>
              <div className="flex items-center justify-between gap-3 bg-black/5 p-2.5 rounded-[20px]">
                <div className="font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted flex items-center gap-2"><i className="fas fa-play-circle text-navy" /> Events Begin</div>
                <div className="font-rajdhani font-extrabold text-[0.9rem] text-dark">31 Aug 2026</div>
              </div>
              <div className="flex items-center justify-between gap-3 bg-black/5 p-2.5 rounded-[20px]">
                <div className="font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted flex items-center gap-2"><i className="fas fa-medal text-navy" /> Events End</div>
                <div className="font-rajdhani font-extrabold text-[0.9rem] text-dark">8 Sep 2026</div>
              </div>
            </div>
            <a href="#sports" className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-gold to-gold-d text-navy-d font-rajdhani font-extrabold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(245,197,24,0.35)] border-0 cursor-pointer hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(245,197,24,0.55)] transition-all duration-300">
              <i className="fas fa-user-plus" /> Register Your Team
            </a>
            <a href="#schedule" className="inline-flex items-center justify-center gap-2 font-rajdhani font-bold text-[0.9rem] tracking-[1px] uppercase text-navy hover:text-navy-d transition-colors">
              <i className="fas fa-calendar-alt" /> View Full Schedule
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
