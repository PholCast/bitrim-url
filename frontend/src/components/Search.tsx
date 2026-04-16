
interface props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    createUrl?: () => void;
}

export const Search = ({searchTerm, setSearchTerm, createUrl}:props) => {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-[#131722] p-3">
        <div className="flex items-center gap-3 rounded-lg border border-white/8 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#64748b"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
            <input className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0" 
                   type="text" 
                   placeholder="Paste your long link here..."
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value) } />
        </div>
        <button onClick={createUrl} className="rounded-lg bg-primary py-3 text-white font-extrabold hover:cursor-pointer hover:bg-primary/90 active:scale-98">
            Shorten URL
        </button>
    </div>
  )
}
