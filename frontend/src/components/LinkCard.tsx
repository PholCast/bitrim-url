import type { Link } from "../pages/Home";

interface LinkCardProps {
  link: Link;
}

export const LinkCard = ({link}:LinkCardProps) => {
  const { original_url, short_code, clicks } = link;
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#131722] px-4 py-5 transition-colors hover:border-primary/40">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-slate-400 font-bold mb-2">{original_url}</p>
        <a
          className="mt-1 block truncate text-base font-bold text-primary hover:text-primary/90"
          href={`http://localhost:3000/${short_code}`}
          target="_blank"
          rel="noreferrer"
        >
          localhost:3000/{short_code}
        </a>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-l border-white/8 pl-4">
        <div className="p-0">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#8f5cff"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z"/><polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93"/><polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"/></g></g></svg>
        </div>

        <div className="text-right leading-tight">
          <p className="text-xl font-extrabold text-slate-100">{clicks.toLocaleString()}</p>
          <p className="text-[10px] uppercase tracking-wide text-slate-500">CLICKS</p>
        </div>
      </div>
    </div>
  )
}
