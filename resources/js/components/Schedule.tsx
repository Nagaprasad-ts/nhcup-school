import { useState } from 'react';

interface SchCardData {
    icon: string;
    date: string;
    sport: string;
    teams: string;
    venue: string;
    status: string;
    gold: boolean;
}

const nhpsCards: SchCardData[] = [
    {
        icon: '🏀',
        date: '31 Aug – 1 Sep',
        sport: 'Basketball',
        teams: 'U14 Boys & Girls',
        venue: 'NHPS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🏀',
        date: '2 Sep – 3 Sep',
        sport: 'Basketball',
        teams: 'U16 Boys & Girls',
        venue: 'NHPS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🏀',
        date: '4 Sep',
        sport: 'Basketball Finals',
        teams: 'All Categories',
        venue: 'NHCE',
        status: 'open',
        gold: true,
    },
    {
        icon: '🏐',
        date: '7 – 8 Sep',
        sport: 'Volleyball',
        teams: 'U14 & U16 Boys & Girls',
        venue: 'NHPS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '♟️',
        date: '1 – 2 Sep',
        sport: 'Chess',
        teams: 'U8, U10, U12 Mixed',
        venue: 'NHPS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🏓',
        date: '3 Sep',
        sport: 'Table Tennis',
        teams: 'U14 & U16 Boys & Girls',
        venue: 'NHPS',
        status: 'upcoming',
        gold: false,
    },
];

const nhgCards: SchCardData[] = [
    {
        icon: '🏸',
        date: '2 – 4 Sep',
        sport: 'Badminton',
        teams: 'U14, U16 & U18 Boys & Girls',
        venue: 'NHG',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '⚽',
        date: '31 Aug – 3 Sep',
        sport: 'Football',
        teams: 'U10, U12 & U14 Boys & Girls',
        venue: 'NHG',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🎾',
        date: '31 Aug',
        sport: 'Pickle Ball',
        teams: 'U16 Boys & Girls',
        venue: 'NHG',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🎾',
        date: '1 Sep',
        sport: 'Pickle Ball',
        teams: 'U14 Boys & Girls',
        venue: 'NHG',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🧘',
        date: '4 Sep',
        sport: 'Yoga',
        teams: 'U10, U12, U14 & U16 Boys & Girls',
        venue: 'NHG',
        status: 'upcoming',
        gold: false,
    },
];

const nhisCards: SchCardData[] = [
    {
        icon: '🏃',
        date: '3 Sep',
        sport: 'Athletics',
        teams: 'U8–U16 Boys & Girls',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🏸',
        date: '31 Aug – 1 Sep',
        sport: 'Badminton',
        teams: 'U10, U12 Boys & Girls',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '♟️',
        date: '3 Sep',
        sport: 'Chess',
        teams: 'U14, U16 Mixed',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '⚽',
        date: '4 – 8 Sep',
        sport: 'Football',
        teams: 'U16 & U18 Boys & Girls',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🏐',
        date: '4 Sep',
        sport: 'Throwball',
        teams: 'U12, U14, U16 Girls',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
    {
        icon: '🥋',
        date: '3 – 4 Sep',
        sport: 'Taekwondo',
        teams: 'Grade 3–8 Boys & Girls',
        venue: 'NHIS',
        status: 'upcoming',
        gold: false,
    },
];

function SchCard({ card }: { card: SchCardData }) {
    const headerClass = card.gold
        ? 'bg-gradient-to-br from-[#7a5800] to-gold'
        : 'bg-gradient-to-br from-navy-d to-navy';
    const statusClass =
        card.status === 'open' || card.status === 'finals'
            ? 'bg-gold/12 text-[#a07700] border border-gold/30'
            : 'bg-sky/12 text-[#0077aa] border border-sky/30';

    return (
        <div className="reveal overflow-hidden rounded-[16px] border border-[rgba(27,48,145,0.08)] bg-white shadow-[0_2px_16px_rgba(27,48,145,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(27,48,145,0.20)]">
            <div
                className={`${headerClass} flex items-center justify-between px-5 py-3.5`}
            >
                <span className="text-[1.8rem] leading-none">{card.icon}</span>
                <span className="font-rajdhani text-[0.85rem] font-bold tracking-[1px] text-white/90">
                    {card.date}
                </span>
            </div>
            <div className="flex flex-col gap-2 p-5">
                <div className="font-orbitron text-[0.9rem] font-bold text-dark">
                    {card.sport}
                </div>
                <div className="font-rajdhani text-[0.85rem] tracking-[0.5px] text-muted">
                    {card.teams}
                </div>
                <div className="mt-1 flex items-center justify-between">
                    <span className="font-rajdhani text-[0.8rem] tracking-[1px] text-muted">
                        <i className="fas fa-location-dot mr-1" />
                        {card.venue}
                    </span>
                    <span
                        className={`rounded-full px-2.5 py-0.5 font-rajdhani text-[0.75rem] font-bold tracking-[1.5px] uppercase ${statusClass}`}
                    >
                        {card.status === 'open' ? 'Finals' : 'Upcoming'}
                    </span>
                </div>
            </div>
        </div>
    );
}

const tabs = [
    { id: 'nhps', label: 'NHPS', cards: nhpsCards },
    { id: 'nhg', label: 'NHG', cards: nhgCards },
    { id: 'nhis', label: 'NHIS', cards: nhisCards },
];

export default function Schedule() {
    const [active, setActive] = useState('nhps');

    return (
        <section id="schedule" className="bg-page2 px-[5%] py-[100px]">
            <div className="reveal mb-14 text-center">
                <span className="mb-4 inline-block rounded-full border border-navy/20 bg-navy/7 px-[18px] py-1 font-rajdhani text-[0.8rem] font-bold tracking-[4px] text-navy uppercase">
                    Event Timeline
                </span>
                <h2 className="mb-4 font-orbitron text-[clamp(2rem,5vw,3.2rem)] leading-tight font-black text-dark">
                    Event{' '}
                    <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">
                        Schedule
                    </span>
                </h2>
                <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-sm bg-gradient-to-r from-navy to-sky" />
                <p className="mt-4 text-base leading-[1.8] text-muted">
                    Stay updated with all key dates, matches, and events
                    throughout the championship.
                </p>
            </div>

            <div className="reveal mb-10 flex flex-wrap justify-center gap-3">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        className={`cursor-pointer rounded-full border-2 px-8 py-3 font-rajdhani text-base font-bold tracking-[2px] uppercase transition-all duration-300 ${active === t.id ? 'border-navy bg-navy text-white shadow-[0_8px_30px_rgba(27,48,145,0.25)]' : 'border-[rgba(27,48,145,0.12)] bg-white text-muted hover:border-navy hover:text-navy'}`}
                        onClick={() => setActive(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tabs.map((t) => (
                <div
                    key={t.id}
                    className={active === t.id ? 'block' : 'hidden'}
                >
                    <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-4 max-[480px]:grid-cols-1 max-md:grid-cols-2">
                        {t.cards.map((card, i) => (
                            <SchCard key={i} card={card} />
                        ))}
                    </div>
                </div>
            ))}

            <div className="reveal mx-auto mt-10 flex max-w-[1100px] items-start gap-4 rounded-[14px] border border-[rgba(27,48,145,0.12)] bg-white p-5 shadow-[0_2px_12px_rgba(27,48,145,0.08)]">
                <i className="fas fa-info-circle mt-0.5 shrink-0 text-xl text-navy" />
                <div>
                    <strong className="font-rajdhani text-[1rem] font-bold tracking-[0.5px] text-dark">
                        Events run from 31st August to 8th September 2026
                    </strong>
                    <p className="mt-1 font-rajdhani text-[0.9rem] leading-[1.7] text-muted">
                        All events are held across NHPS, NHG, and NHIS campuses.
                        Basketball Finals on 4th Sep at NHCE.
                    </p>
                </div>
            </div>
        </section>
    );
}
