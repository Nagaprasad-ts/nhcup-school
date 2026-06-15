import { Link } from '@inertiajs/react';
import type { Sport } from '@/data/sports';

export default function Sports({ sports }: { sports: Sport[] }) {
    return (
        <section id="sports" className="bg-white px-[5%] py-[100px]">
            <div className="reveal mb-14 text-center">
                <span className="mb-4 inline-block rounded-full border border-navy/20 bg-navy/7 px-[18px] py-1 font-rajdhani text-[0.8rem] font-bold tracking-[4px] text-navy uppercase">
                    Disciplines
                </span>
                <h2 className="mb-4 font-orbitron text-[clamp(2rem,5vw,3.2rem)] leading-tight font-black text-dark">
                    Sports{' '}
                    <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">
                        Categories
                    </span>
                </h2>
                <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-sm bg-gradient-to-r from-navy to-sky" />
                <p className="mt-4 text-base leading-[1.8] text-muted">
                    Eleven thrilling sports disciplines. One ultimate
                    championship. Choose your battleground.
                </p>
            </div>
            <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-4 max-[480px]:grid-cols-2 max-md:grid-cols-2">
                {sports.map((s) => (
                    <Link
                        key={s.sport_id}
                        href={`/register/${s.sport_id}`}
                        className={`reveal group relative cursor-pointer overflow-hidden rounded-[18px] border-2 p-7 text-center no-underline shadow-[0_2px_16px_rgba(27,48,145,0.10)] transition-all duration-300 max-[480px]:p-5 ${
                            s.is_active
                                ? 'border-[rgba(27,48,145,0.12)] bg-white hover:-translate-y-2 hover:border-navy hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)]'
                                : 'border-gray-200 bg-gray-50 opacity-70'
                        }`}
                    >
                        <span className="mb-3 block text-[2.8rem] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg] max-[480px]:text-[2.2rem]">
                            {s.icon}
                        </span>
                        <div className="mb-1 font-orbitron text-[0.9rem] font-bold tracking-[0.5px] text-dark">
                            {s.name}
                        </div>
                        <div className="font-rajdhani text-[0.8rem] tracking-[1px] text-muted uppercase">
                            {s.teams}
                        </div>
                        {s.is_active ? (
                            <div className="mt-2.5 inline-block rounded-full border border-navy/20 bg-navy/7 px-2.5 py-0.5 font-rajdhani text-[0.7rem] font-bold tracking-[2px] text-navy uppercase">
                                {s.badge}
                            </div>
                        ) : (
                            <div className="mt-2.5 inline-block rounded-full border border-nhred/20 bg-nhred/8 px-2.5 py-0.5 font-rajdhani text-[0.7rem] font-bold tracking-[2px] text-nhred uppercase">
                                Coming Soon
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </section>
    );
}
