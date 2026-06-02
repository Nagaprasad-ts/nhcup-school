export default function HomeFooter() {
  const socialLink = 'w-10 h-10 rounded-full bg-white/6 border border-white/12 flex items-center justify-center text-[1rem] text-[#94a3b8] hover:bg-navy-l hover:border-sky hover:text-white hover:-translate-y-0.5 transition-all'

  return (
    <footer className="bg-[#0a1240] border-t-[3px] border-gold">

      {/* Main footer body */}
      <div className="max-w-300 mx-auto px-[5%] py-12 grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-8">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4 max-md:items-center max-md:text-center">
          <img src="/images/nhcup_logo.png" alt="NHCUP 2026" className="size-24 md:size-32 drop-shadow-[0_4px_20px_rgba(93,184,223,0.22)]" />
          <p className="font-rajdhani font-bold text-[0.85rem] tracking-[2px] uppercase bg-linear-to-r from-sky to-gold bg-clip-text text-transparent">
            State Level Inter-School<br />Sports Championship
          </p>
          {/* Social icons */}
          <div className="flex gap-2.5 mt-1">
            <a className={socialLink} href="#"><i className="fab fa-instagram" /></a>
            <a className={socialLink} href="#"><i className="fab fa-facebook" /></a>
            <a className={socialLink} href="#"><i className="fab fa-youtube" /></a>
            <a className={socialLink} href="#"><i className="fab fa-twitter" /></a>
          </div>
        </div>

        {/* Col 2 — Quick links */}
        <div className="flex flex-col max-md:flex-row gap-3 max-md:items-center max-md:text-center max-md:justify-center">
          <p className="font-rajdhani font-bold text-[0.72rem] max-md:text-center tracking-[3px] uppercase text-white/40 mb-1 max-md:mb-0">Quick Links</p>
          <a href="#sports"   className="font-rajdhani font-bold text-[0.9rem] tracking-[1.5px] uppercase text-white/55 hover:text-white transition-colors w-fit">Sports</a>
          <a href="#schedule" className="font-rajdhani font-bold text-[0.9rem] tracking-[1.5px] uppercase text-white/55 hover:text-white transition-colors w-fit">Schedule</a>
          <a href="#reg-cta"  className="font-rajdhani font-bold text-[0.9rem] tracking-[1.5px] uppercase text-white/55 hover:text-white transition-colors w-fit">Register</a>
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col gap-3 max-md:items-center max-md:text-center">
          <p className="font-rajdhani font-bold text-[0.72rem] tracking-[3px] uppercase text-white/40 mb-1">Contact Us</p>
          <p className="font-rajdhani text-[0.8rem] text-white/35 leading-[1.6]">
            For queries or clarifications regarding the championship, reach out to us.
          </p>
          <a href="tel:9663412000" className="font-rajdhani font-bold text-[0.9rem] text-white/60 hover:text-sky transition-colors flex items-center gap-2 w-fit max-md:mx-auto">
            <i className="fas fa-phone text-sky text-[0.8rem]" /> 96634 12000
          </a>
          <a href="mailto:nhcup@newhorizonindia.edu" className="font-rajdhani font-bold text-[0.9rem] text-white/60 hover:text-sky transition-colors flex items-center gap-2 w-fit max-md:mx-auto">
            <i className="fas fa-envelope text-sky text-[0.8rem]" /> nhcup@newhorizonindia.edu
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-[5%] py-4 flex items-center justify-center max-md:flex-col max-md:gap-1 max-md:text-center">
        <p className="font-rajdhani text-[0.78rem] text-white/30">
          © 2026 NHCUP — New Horizon College, Bangalore. All rights reserved.
        </p>
      </div>

    </footer>
  )
}
