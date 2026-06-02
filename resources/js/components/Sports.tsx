import { Link } from '@inertiajs/react'
import type { Sport } from '@/data/sports'

export default function Sports({ sports }: { sports: Sport[] }) {
  return (
    <section id="sports" className="py-[100px] px-[5%] bg-white">
      <div className="text-center mb-14 reveal">
        <span className="inline-block font-rajdhani font-bold text-[0.8rem] tracking-[4px] uppercase text-navy bg-navy/7 border border-navy/20 px-[18px] py-1 rounded-full mb-4">Disciplines</span>
        <h2 className="font-orbitron text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight text-dark mb-4">Sports <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">Categories</span></h2>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-navy to-sky rounded-sm mx-auto mt-4" />
        <p className="text-base text-muted leading-[1.8] mt-4">Eleven thrilling sports disciplines. One ultimate championship. Choose your battleground.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(185px,1fr))] max-md:grid-cols-2 max-[480px]:grid-cols-2 gap-4 max-w-[1200px] mx-auto">
        {sports.map((s) => (
          <Link key={s.sport_id} href={`/register/${s.sport_id}`} className="reveal bg-white border-2 border-[rgba(27,48,145,0.12)] rounded-[18px] p-7 max-[480px]:p-5 text-center cursor-pointer relative overflow-hidden shadow-[0_2px_16px_rgba(27,48,145,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)] hover:border-navy no-underline group">
            <span className="text-[2.8rem] max-[480px]:text-[2.2rem] mb-3 block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">{s.icon}</span>
            <div className="font-orbitron text-[0.9rem] font-bold text-dark tracking-[0.5px] mb-1">{s.name}</div>
            <div className="font-rajdhani text-[0.8rem] tracking-[1px] uppercase text-muted">{s.teams}</div>
            <div className="inline-block mt-2.5 bg-navy/7 border border-navy/20 text-navy font-rajdhani text-[0.7rem] font-bold tracking-[2px] uppercase px-2.5 py-0.5 rounded-full">{s.badge}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
