import { Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import HomeFooter from '@/components/HomeFooter'
import Loader from '@/components/Loader'
import MobileMenu from '@/components/MobileMenu'
import Navbar from '@/components/Navbar'
import RegCta from '@/components/RegCta'
import Schedule from '@/components/Schedule'
import Sports from '@/components/Sports'
import type { Sport } from '@/data/sports'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Props { sports: Sport[] }

export default function Home({ sports }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [showTop, setShowTop]       = useState(false)
    useScrollReveal()

    useEffect(() => {
        const handler = () => setShowTop(window.scrollY > 400)
        window.addEventListener('scroll', handler)

        return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
        <>
            <Head title="NHCUP 2026 — Inter-School Sports Championship" />
            <Loader />
            <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <MobileMenu open={mobileOpen} closeMobile={() => setMobileOpen(false)} />
            <main>
                <Hero />
                <Sports sports={sports} />
                <Schedule />
                <RegCta />
            </main>
            <HomeFooter />

            {/* Back to top */}
            <a
                href="#hero"
                aria-label="Back to top"
                className={`fixed bottom-8 right-8 z-900 w-11.5 h-11.5 rounded-full bg-linear-to-br from-navy to-navy-l text-white flex items-center justify-center text-[1.1rem] shadow-[0_8px_30px_rgba(27,48,145,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(27,48,145,0.45)] ${showTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <i className="fas fa-chevron-up" />
            </a>
        </>
    )
}
