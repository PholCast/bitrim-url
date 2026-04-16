
interface InfoCardProps {
  title: string;
  description: string;
  icon: "stats" | "bolt" | "shield";
}

const iconMap = {
  stats: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8f5cff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18V10" />
      <path d="M10 18V6" />
      <path d="M16 18v-4" />
      <path d="M22 18v-8" />
      <path d="M4 22h18" />
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8f5cff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="#8f5cff"><path d="M480-80q-139-35-229.5-160T160-520v-280l320-120 320 120v280q0 155-90.5 280T480-80Zm0-84q104-33 172-132.5T720-520v-224l-240-90-240 90v224q0 124 68 223.5T480-164Zm0-316Z"/></svg>
  )
} as const;

export const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <article className="rounded-2xl border border-white/8 bg-[#171b29] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-5 inline-flex rounded-lg bg-primary/15 p-2.5">
        {iconMap[icon]}
      </div>
      <h3 className="text-2xl font-extrabold text-slate-100">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-400">{description}</p>
    </article>
  )
}
