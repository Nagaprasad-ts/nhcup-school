import { useEffect, useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';

export default function Hero() {
    const { timeLeft, label } = useCountdown();
    const [isMobile, setIsMobile] = useState(
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 768px)').matches,
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);

        return () => mq.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        const handler = () => {
            const hero = document.getElementById('hero');

            if (hero) {
                hero.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.3}px)`;
            }
        };
        window.addEventListener('scroll', handler);

        return () => window.removeEventListener('scroll', handler);
    }, []);

    const bgImage = isMobile
        ? '/images/mobile_banner.png'
        : '/images/main_banner.png';

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-start overflow-hidden md:items-center"
            style={{
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-1"
                style={{
                    background:
                        'linear-gradient(to right, rgba(5,10,40,0.88) 0%, rgba(5,10,40,0.65) 45%, rgba(5,10,40,0.10) 100%)',
                }}
            />
            <div className="relative z-2 flex w-[70%] flex-col items-start gap-5 px-[8%] pt-10 pb-20 max-md:w-full max-md:items-center max-md:px-[6%] max-md:text-center">
                {/* Title row */}
                <div className="flex items-center gap-6 max-md:flex-col max-md:items-center">
                    <img
                        src="/images/nhcup_logo.png"
                        alt="NHCUP 2026"
                        className="h-32 w-auto shrink-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] max-md:h-22.5"
                    />
                    <h1 className="m-0 font-orbitron text-[46px] leading-tight font-black tracking-tight text-white max-[480px]:text-[26px] max-[480px]:leading-10 max-md:text-[clamp(1.8rem,7vw,2.8rem)]">
                        State Level Inter-School
                        <br />
                        <span className="bg-linear-to-br from-sky to-gold bg-clip-text text-transparent">
                            Sports Championship
                        </span>
                    </h1>
                </div>
                {/* Subtitle */}
                <p className="m-0 max-w-170 text-base leading-[1.75] text-white/70 max-md:text-[0.95rem]">
                    The ultimate battle of pride &amp; sportsmanship. 11 sports
                    disciplines, 50+ schools, 1200+ athletes across Bangalore's
                    finest campuses.
                </p>
                {/* Countdown */}
                <div className="mt-0">
                    <p className="mb-3 font-rajdhani text-xl font-bold tracking-[3px] text-white/90 uppercase">
                        {label}
                    </p>
                    <div className="flex flex-wrap gap-2.5 max-md:flex-nowrap max-md:justify-center">
                        {[
                            { val: timeLeft.d, unit: 'Days' },
                            { val: timeLeft.h, unit: 'Hours' },
                            { val: timeLeft.m, unit: 'Mins' },
                            { val: timeLeft.s, unit: 'Secs' },
                        ].map(({ val, unit }) => (
                            <div
                                key={unit}
                                className="w-25 shrink-0 rounded-[10px] border border-white/20 bg-white/10 p-3.5 text-center max-[480px]:w-15.5 max-md:w-18"
                            >
                                <span className="block font-orbitron text-[2rem] leading-none font-bold text-white tabular-nums max-[480px]:text-[1.3rem] max-md:text-[1.6rem]">
                                    {val}
                                </span>
                                <span className="mt-1.5 block font-rajdhani text-[0.65rem] tracking-[2px] text-white/50 uppercase max-[480px]:text-[0.55rem] max-[480px]:tracking-[1px]">
                                    {unit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-wrap gap-3.5 max-md:w-full max-md:flex-col max-md:items-center">
                    <a
                        href="#sports"
                        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-0 bg-linear-to-br from-gold to-gold-d px-8 py-3.5 font-rajdhani text-base font-extrabold tracking-[2px] text-navy-d uppercase shadow-[0_4px_20px_rgba(245,197,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(245,197,24,0.55)] max-md:w-full max-md:max-w-[340px] max-md:justify-center"
                    >
                        <i className="fas fa-trophy" /> Register Your Team
                    </a>
                    <a
                        href="#schedule"
                        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-2 border-white/50 bg-transparent px-8 py-3.5 font-rajdhani text-base font-bold tracking-[2px] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/12 max-md:w-full max-md:max-w-[340px] max-md:justify-center"
                    >
                        <i className="fas fa-calendar-alt" /> View Schedule
                    </a>
                </div>
            </div>
        </section>
    );
}
