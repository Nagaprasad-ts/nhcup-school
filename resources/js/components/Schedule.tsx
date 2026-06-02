import { useState } from 'react'

interface SchCardData {
  icon: string
  date: string
  sport: string
  teams: string
  venue: string
  status: string
  gold: boolean
}

const nhpsCards: SchCardData[] = [
  { icon: '🏀', date: '31 Aug – 1 Sep', sport: 'Basketball',      teams: 'U14 Boys & Girls',          venue: 'NHPS', status: 'upcoming', gold: false },
  { icon: '🏀', date: '2 Sep – 3 Sep',  sport: 'Basketball',      teams: 'U16 Boys & Girls',          venue: 'NHPS', status: 'upcoming', gold: false },
  { icon: '🏀', date: '4 Sep',          sport: 'Basketball Finals',teams: 'All Categories',            venue: 'NHCE', status: 'open',     gold: true  },
  { icon: '🏐', date: '7 – 8 Sep',      sport: 'Volleyball',       teams: 'U14 & U16 Boys & Girls',   venue: 'NHPS', status: 'upcoming', gold: false },
  { icon: '♟️', date: '1 – 2 Sep',     sport: 'Chess',            teams: 'U8, U10, U12 Mixed',       venue: 'NHPS', status: 'upcoming', gold: false },
  { icon: '🏓', date: '3 Sep',          sport: 'Table Tennis',     teams: 'U14 & U16 Boys & Girls',   venue: 'NHPS', status: 'upcoming', gold: false },
]

const nhgCards: SchCardData[] = [
  { icon: '🏸', date: '2 – 4 Sep',      sport: 'Badminton',   teams: 'U14, U16 & U18 Boys & Girls',      venue: 'NHG', status: 'upcoming', gold: false },
  { icon: '⚽', date: '31 Aug – 3 Sep', sport: 'Football',    teams: 'U10, U12 & U14 Boys & Girls',      venue: 'NHG', status: 'upcoming', gold: false },
  { icon: '🎾', date: '31 Aug',          sport: 'Pickle Ball', teams: 'U16 Boys & Girls',                 venue: 'NHG', status: 'upcoming', gold: false },
  { icon: '🎾', date: '1 Sep',           sport: 'Pickle Ball', teams: 'U14 Boys & Girls',                 venue: 'NHG', status: 'upcoming', gold: false },
  { icon: '🧘', date: '4 Sep',           sport: 'Yoga',        teams: 'U10, U12, U14 & U16 Boys & Girls', venue: 'NHG', status: 'upcoming', gold: false },
]

const nhisCards: SchCardData[] = [
  { icon: '🏃', date: '3 Sep',          sport: 'Athletics',  teams: 'U8–U16 Boys & Girls',      venue: 'NHIS', status: 'upcoming', gold: false },
  { icon: '🏸', date: '31 Aug – 1 Sep', sport: 'Badminton',  teams: 'U10, U12 Boys & Girls',    venue: 'NHIS', status: 'upcoming', gold: false },
  { icon: '♟️', date: '3 Sep',         sport: 'Chess',      teams: 'U14, U16 Mixed',            venue: 'NHIS', status: 'upcoming', gold: false },
  { icon: '⚽', date: '4 – 8 Sep',      sport: 'Football',   teams: 'U16 & U18 Boys & Girls',   venue: 'NHIS', status: 'upcoming', gold: false },
  { icon: '🏐', date: '4 Sep',           sport: 'Throwball',  teams: 'U12, U14, U16 Girls',      venue: 'NHIS', status: 'upcoming', gold: false },
  { icon: '🥋', date: '3 – 4 Sep',      sport: 'Taekwondo',  teams: 'Grade 3–8 Boys & Girls',   venue: 'NHIS', status: 'upcoming', gold: false },
]

function SchCard({ card }: { card: SchCardData }) {
  const headerClass = card.gold
    ? 'bg-gradient-to-br from-[#7a5800] to-gold'
    : 'bg-gradient-to-br from-navy-d to-navy'
  const statusClass = card.status === 'open' || card.status === 'finals'
    ? 'bg-gold/12 text-[#a07700] border border-gold/30'
    : 'bg-sky/12 text-[#0077aa] border border-sky/30'

  return (
    <div className="reveal bg-white rounded-[16px] overflow-hidden shadow-[0_2px_16px_rgba(27,48,145,0.10)] border border-[rgba(27,48,145,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(27,48,145,0.20)]">
      <div className={`${headerClass} flex items-center justify-between px-5 py-3.5`}>
        <span className="text-[1.8rem] leading-none">{card.icon}</span>
        <span className="font-rajdhani font-bold text-[0.85rem] tracking-[1px] text-white/90">{card.date}</span>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="font-orbitron text-[0.9rem] font-bold text-dark">{card.sport}</div>
        <div className="font-rajdhani text-[0.85rem] tracking-[0.5px] text-muted">{card.teams}</div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-rajdhani text-[0.8rem] tracking-[1px] text-muted">
            <i className="fas fa-location-dot mr-1" />{card.venue}
          </span>
          <span className={`font-rajdhani text-[0.75rem] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full ${statusClass}`}>
            {card.status === 'open' ? 'Finals' : 'Upcoming'}
          </span>
        </div>
      </div>
    </div>
  )
}

const tabs = [
  { id: 'nhps', label: 'NHPS', cards: nhpsCards },
  { id: 'nhg',  label: 'NHG',  cards: nhgCards  },
  { id: 'nhis', label: 'NHIS', cards: nhisCards  },
]

export default function Schedule() {
  const [active, setActive] = useState('nhps')

  return (
    <section id="schedule" className="py-[100px] px-[5%] bg-page2">
      <div className="text-center mb-14 reveal">
        <span className="inline-block font-rajdhani font-bold text-[0.8rem] tracking-[4px] uppercase text-navy bg-navy/7 border border-navy/20 px-[18px] py-1 rounded-full mb-4">Event Timeline</span>
        <h2 className="font-orbitron text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight text-dark mb-4">Event <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">Schedule</span></h2>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-navy to-sky rounded-sm mx-auto mt-4" />
        <p className="text-base text-muted leading-[1.8] mt-4">Stay updated with all key dates, matches, and events throughout the championship.</p>
      </div>

      <div className="flex gap-3 justify-center mb-10 reveal flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`font-rajdhani font-bold text-base tracking-[2px] uppercase px-8 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer ${active === t.id ? 'bg-navy text-white border-navy shadow-[0_8px_30px_rgba(27,48,145,0.25)]' : 'bg-white border-[rgba(27,48,145,0.12)] text-muted hover:border-navy hover:text-navy'}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map(t => (
        <div key={t.id} className={active === t.id ? 'block' : 'hidden'}>
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-4 max-w-[1100px] mx-auto">
            {t.cards.map((card, i) => <SchCard key={i} card={card} />)}
          </div>
        </div>
      ))}

      <div className="reveal flex items-start gap-4 max-w-[1100px] mx-auto mt-10 bg-white border border-[rgba(27,48,145,0.12)] rounded-[14px] p-5 shadow-[0_2px_12px_rgba(27,48,145,0.08)]">
        <i className="fas fa-info-circle text-navy text-xl mt-0.5 shrink-0" />
        <div>
          <strong className="font-rajdhani font-bold text-dark text-[1rem] tracking-[0.5px]">Events run from 31st August to 8th September 2026</strong>
          <p className="font-rajdhani text-muted text-[0.9rem] mt-1 leading-[1.7]">All events are held across NHPS, NHG, and NHIS campuses. Basketball Finals on 4th Sep at NHCE.</p>
        </div>
      </div>
    </section>
  )
}
