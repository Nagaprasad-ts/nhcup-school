import { Link } from '@inertiajs/react';

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-page2">
            {/* Navbar */}
            <nav className="relative z-[1000] flex h-[72px] items-center justify-between border-b border-[rgba(27,48,145,0.08)] bg-white px-[5%] shadow-[0_2px_16px_rgba(27,48,145,0.10)] max-md:h-[64px]">
                <div className="flex items-center gap-10 max-md:gap-2.5">
                    <img
                        src="/images/nhps.png"
                        alt="NHPS"
                        className="h-[52px] w-auto object-contain max-[480px]:h-[38px] max-md:h-[44px]"
                    />
                    <img
                        src="/images/gurukul.png"
                        alt="NHG"
                        className="h-[52px] w-auto object-contain max-[480px]:h-[38px] max-md:h-[44px]"
                    />
                    <img
                        src="/images/nhis.png"
                        alt="NHIS"
                        className="h-[52px] w-auto object-contain max-[480px]:h-[38px] max-md:h-[44px]"
                    />
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-5 py-2 font-rajdhani text-[0.95rem] font-bold tracking-[1.5px] text-navy uppercase transition-all hover:bg-navy hover:text-white hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)] max-md:px-3.5 max-md:text-[0.82rem]"
                >
                    <i className="fas fa-home" /> Home
                </Link>
            </nav>

            {/* Page content */}
            <div className="flex-1">{children}</div>

            {/* Footer */}
            <footer className="border-t-[3px] border-gold bg-[#0a1240] px-[5%] py-5 text-center">
                <p className="font-rajdhani text-[0.82rem] text-white/30">
                    © 2026 NHCUP — New Horizon College, Bangalore. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
