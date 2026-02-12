
interface props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    createUrl?: () => void;
}

export const Search = ({searchTerm, setSearchTerm, createUrl}:props) => {
  return (
    <div className=" w-[55%] flex flex-col gap-4 p-6 rounded-2xl bg-[#1a1a24]">
        <div className="flex gap-3 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
            <input className="py-3 w-full focus:outline-none focus:ring-0" 
                   type="text" 
                   placeholder="Shorten your link here..."
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value) } />
        </div>
        <button onClick={createUrl} className="bg-primary 
                            py-3 text-white  rounded-xl 
                            font-extrabold hover:cursor-pointer
                          hover:bg-primary/90 active:scale-98">
            Shorten URL
        </button>
    </div>
  )
}
