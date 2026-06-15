export default function RegCta() {
    return (
        <section
            id="reg-cta"
            className="relative overflow-hidden bg-gradient-to-br from-navy-d via-navy to-[#1e3fad] px-[8%] py-[90px]"
        >
            <div className="relative z-[1] mx-auto grid max-w-[1100px] grid-cols-2 items-center gap-[60px] max-md:grid-cols-1 max-md:gap-10">
                <div className="reveal-left">
                    <span className="mb-5 inline-block rounded-full border border-gold/25 bg-gold/10 px-[18px] py-1 font-rajdhani text-[0.8rem] font-bold tracking-[4px] text-gold uppercase">
                        Join the Battle
                    </span>
                    <h2 className="mb-5 font-orbitron text-[clamp(2rem,5vw,3.2rem)] leading-tight font-black text-white">
                        Ready to
                        <br />
                        <span className="bg-gradient-to-br from-sky to-gold bg-clip-text text-transparent">
                            Compete?
                        </span>
                    </h2>
                    <p className="mb-8 max-w-[480px] text-base leading-[1.8] text-white/70">
                        Secure your spot at NHCUP 2026 — the premier
                        inter-school sports championship across Bangalore's
                        finest campuses.
                    </p>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-inter text-[1.8rem] font-black text-gold">
                                11
                            </span>
                            <span className="font-rajdhani text-[0.85rem] tracking-[2px] text-white/60 uppercase">
                                Sports
                            </span>
                        </div>
                        <div className="w-px self-stretch bg-white/15" />
                        <div className="flex flex-col gap-1">
                            <span className="font-inter text-[1.8rem] font-black text-gold">
                                50+
                            </span>
                            <span className="font-rajdhani text-[0.85rem] tracking-[2px] text-white/60 uppercase">
                                Schools
                            </span>
                        </div>
                        <div className="w-px self-stretch bg-white/15" />
                        <div className="flex flex-col gap-1">
                            <span className="font-inter text-[1.8rem] font-black text-gold">
                                1200+
                            </span>
                            <span className="font-rajdhani text-[0.85rem] tracking-[2px] text-white/60 uppercase">
                                Athletes
                            </span>
                        </div>
                    </div>
                </div>

                <div className="reveal-right flex justify-center max-md:justify-center">
                    <div className="flex w-full max-w-[400px] flex-col gap-5 rounded-[20px] bg-white p-9">
                        <div className="mb-1 flex items-center gap-3">
                            <i className="fas fa-trophy text-xl text-gold" />
                            <span className="font-orbitron text-[1.1rem] font-bold tracking-[1px] text-dark">
                                NHCUP 2026
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-3 rounded-[20px] bg-black/5 p-2.5">
                                <div className="flex items-center gap-2 font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted">
                                    <i className="fas fa-flag text-navy" />{' '}
                                    Registration Opens
                                </div>
                                <div className="font-rajdhani text-[0.9rem] font-extrabold text-dark">
                                    15 Jun 2026
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 rounded-[20px] bg-black/5 p-2.5">
                                <div className="flex items-center gap-2 font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted">
                                    <i className="fas fa-hourglass-end text-navy" />{' '}
                                    Registration Closes
                                </div>
                                <div className="font-rajdhani text-[0.9rem] font-extrabold text-dark">
                                    24 Aug 2026
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 rounded-[20px] bg-black/5 p-2.5">
                                <div className="flex items-center gap-2 font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted">
                                    <i className="fas fa-play-circle text-navy" />{' '}
                                    Events Begin
                                </div>
                                <div className="font-rajdhani text-[0.9rem] font-extrabold text-dark">
                                    31 Aug 2026
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 rounded-[20px] bg-black/5 p-2.5">
                                <div className="flex items-center gap-2 font-rajdhani text-[0.85rem] font-bold tracking-[0.5px] text-muted">
                                    <i className="fas fa-medal text-navy" />{' '}
                                    Events End
                                </div>
                                <div className="font-rajdhani text-[0.9rem] font-extrabold text-dark">
                                    8 Sep 2026
                                </div>
                            </div>
                        </div>
                        <a
                            href="#sports"
                            className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-gradient-to-br from-gold to-gold-d px-8 py-3.5 font-rajdhani text-base font-extrabold tracking-[2px] text-navy-d uppercase shadow-[0_4px_20px_rgba(245,197,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(245,197,24,0.55)]"
                        >
                            <i className="fas fa-user-plus" /> Register Your
                            Team
                        </a>
                        <a
                            href="#schedule"
                            className="inline-flex items-center justify-center gap-2 font-rajdhani text-[0.9rem] font-bold tracking-[1px] text-navy uppercase transition-colors hover:text-navy-d"
                        >
                            <i className="fas fa-calendar-alt" /> View Full
                            Schedule
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
