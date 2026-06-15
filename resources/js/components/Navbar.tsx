interface NavbarProps {
    mobileOpen: boolean;
    setMobileOpen: (fn: (o: boolean) => boolean) => void;
}
export default function Navbar({ mobileOpen, setMobileOpen }: NavbarProps) {
    return (
        <nav className="relative z-[1000] flex h-[72px] items-center justify-center border-b border-[rgba(27,48,145,0.08)] bg-white px-[5%] shadow-[0_2px_16px_rgba(27,48,145,0.10)]">
            <div className="flex items-center gap-10 max-md:gap-3">
                <img
                    src="/images/nhps.png"
                    alt="NHPS"
                    className="h-[110px] w-auto object-contain max-md:h-[50px]"
                />
                <img
                    src="/images/gurukul.png"
                    alt="NHG"
                    className="h-[110px] w-auto object-contain max-md:h-[50px]"
                />
                <img
                    src="/images/nhis.png"
                    alt="NHIS"
                    className="h-[110px] w-auto object-contain max-md:h-[50px]"
                />
            </div>
            <button
                className={`ml-auto flex cursor-pointer flex-col gap-[5px] p-1 md:hidden ${mobileOpen ? '[&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-[7px] [&>span:nth-child(3)]:-rotate-45' : ''}`}
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
            >
                <span className="block h-0.5 w-[26px] rounded-sm bg-navy transition-all duration-300" />
                <span className="block h-0.5 w-[26px] rounded-sm bg-navy transition-all duration-300" />
                <span className="block h-0.5 w-[26px] rounded-sm bg-navy transition-all duration-300" />
            </button>
        </nav>
    );
}
