
import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 py-3 px-25 bg-dark text-white border-b border-b-[#312447]">
      <Link to="/" className="flex justify-center items-center gap-1">
        <div className="bg-primary inline-block rounded-lg p-1 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
        </div>
        <span className="text-xl font-extrabold">BiTrimURL</span>
      </Link>
      <div className="bg-primary/10 px-3 py-1.5 text-xs rounded-full border border-primary/20">
        <span className="text-primary font-bold">No Sign-up Required</span>
      </div>
    </header>
  )
}
