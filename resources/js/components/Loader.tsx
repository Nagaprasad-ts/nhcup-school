import { useEffect, useState } from 'react';

export default function Loader() {
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setHidden(true), 2200);

        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-[opacity,visibility] duration-500 ${hidden ? 'invisible opacity-0' : ''}`}
        >
            <img
                src="/images/nhcup_logo.png"
                alt="NHCUP 2026"
                className="h-auto w-32 animate-pulse-logo drop-shadow-[0_4px_20px_rgba(27,48,145,0.3)]"
            />
            <div className="mt-7 h-1 w-64 overflow-hidden rounded-sm bg-page3">
                <div className="h-full w-0 animate-load-fill rounded-sm bg-gradient-to-r from-navy to-sky" />
            </div>
            <p className="mt-3.5 animate-text-blink font-rajdhani text-base tracking-[3px] text-muted uppercase">
                Loading...
            </p>
        </div>
    );
}
