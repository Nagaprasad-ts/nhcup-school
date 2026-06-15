export default function HomeFooter() {
    const socialLink =
        'w-10 h-10 rounded-full bg-white/6 border border-white/12 flex items-center justify-center text-[1rem] text-[#94a3b8] hover:bg-navy-l hover:border-sky hover:text-white hover:-translate-y-0.5 transition-all';

    return (
        <footer className="border-t-[3px] border-gold bg-[#0a1240]">
            {/* Main footer body */}
            <div className="mx-auto grid max-w-300 grid-cols-3 gap-10 px-[5%] py-12 max-md:grid-cols-1 max-md:gap-8">
                {/* Col 1 — Brand */}
                <div className="flex flex-col gap-4 max-md:items-center max-md:text-center">
                    <img
                        src="/images/nhcup_logo.png"
                        alt="NHCUP 2026"
                        className="size-24 drop-shadow-[0_4px_20px_rgba(93,184,223,0.22)] md:size-32"
                    />
                    <p className="bg-linear-to-r from-sky to-gold bg-clip-text font-rajdhani text-[0.85rem] font-bold tracking-[2px] text-transparent uppercase">
                        State Level Inter-School
                        <br />
                        Sports Championship
                    </p>
                    {/* Social icons */}
                    <div className="mt-1 flex gap-2.5">
                        <a className={socialLink} href="#">
                            <i className="fab fa-instagram" />
                        </a>
                        <a className={socialLink} href="#">
                            <i className="fab fa-facebook" />
                        </a>
                        <a className={socialLink} href="#">
                            <i className="fab fa-youtube" />
                        </a>
                        <a className={socialLink} href="#">
                            <i className="fab fa-twitter" />
                        </a>
                    </div>
                </div>

                {/* Col 2 — Quick links */}
                <div className="flex flex-col gap-3 max-md:flex-row max-md:items-center max-md:justify-center max-md:text-center">
                    <p className="mb-1 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-white/40 uppercase max-md:mb-0 max-md:text-center">
                        Quick Links
                    </p>
                    <a
                        href="#sports"
                        className="w-fit font-rajdhani text-[0.9rem] font-bold tracking-[1.5px] text-white/55 uppercase transition-colors hover:text-white"
                    >
                        Sports
                    </a>
                    <a
                        href="#schedule"
                        className="w-fit font-rajdhani text-[0.9rem] font-bold tracking-[1.5px] text-white/55 uppercase transition-colors hover:text-white"
                    >
                        Schedule
                    </a>
                    <a
                        href="#reg-cta"
                        className="w-fit font-rajdhani text-[0.9rem] font-bold tracking-[1.5px] text-white/55 uppercase transition-colors hover:text-white"
                    >
                        Register
                    </a>
                </div>

                {/* Col 3 — Contact */}
                <div className="flex flex-col gap-3 max-md:items-center max-md:text-center">
                    <p className="mb-1 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-white/40 uppercase">
                        Contact Us
                    </p>
                    <p className="font-rajdhani text-[0.8rem] leading-[1.6] text-white/35">
                        For queries or clarifications regarding the
                        championship, reach out to us.
                    </p>
                    <a
                        href="tel:9663412000"
                        className="flex w-fit items-center gap-2 font-rajdhani text-[0.9rem] font-bold text-white/60 transition-colors hover:text-sky max-md:mx-auto"
                    >
                        <i className="fas fa-phone text-[0.8rem] text-sky" />{' '}
                        96634 12000
                    </a>
                    <a
                        href="mailto:nhcup@newhorizonindia.edu"
                        className="flex w-fit items-center gap-2 font-rajdhani text-[0.9rem] font-bold text-white/60 transition-colors hover:text-sky max-md:mx-auto"
                    >
                        <i className="fas fa-envelope text-[0.8rem] text-sky" />{' '}
                        nhcup@newhorizonindia.edu
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-center border-t border-white/8 px-[5%] py-4 max-md:flex-col max-md:gap-1 max-md:text-center">
                <p className="font-rajdhani text-[0.78rem] text-white/30">
                    © 2026 NHCUP — New Horizon College, Bangalore. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
