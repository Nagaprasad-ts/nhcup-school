interface MobileMenuProps {
    open: boolean;
    closeMobile: () => void;
}
export default function MobileMenu({ open, closeMobile }: MobileMenuProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="absolute top-[72px] right-0 left-0 z-[999] flex flex-col gap-5 border-t-2 border-navy bg-white/98 px-[5%] pt-6 pb-8 shadow-[0_8px_30px_rgba(27,48,145,0.12)] backdrop-blur-xl">
            <a
                href="#sports"
                onClick={closeMobile}
                className="border-b border-[rgba(27,48,145,0.12)] pb-4 font-rajdhani text-xl font-bold tracking-[2px] text-dark uppercase transition-colors hover:text-navy"
            >
                Sports
            </a>
            <a
                href="#schedule"
                onClick={closeMobile}
                className="border-b border-[rgba(27,48,145,0.12)] pb-4 font-rajdhani text-xl font-bold tracking-[2px] text-dark uppercase transition-colors hover:text-navy"
            >
                Schedule
            </a>
            <a
                href="#reg-cta"
                onClick={closeMobile}
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-gradient-to-br from-gold to-gold-d px-8 py-3.5 font-rajdhani text-base font-extrabold tracking-[2px] text-navy-d uppercase shadow-[0_4px_20px_rgba(245,197,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
                Register Now
            </a>
        </div>
    );
}
