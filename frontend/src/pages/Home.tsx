import { useEffect, useState } from "react"
import { Search } from "../components/Search"
import { LinkCard } from "../components/LinkCard";

export interface Link { //todo: mover a un archivo types.ts o interfaces.ts
  id: number;
  original_url: string;
  short_code?: string;
  clicks: number;
  created_at: string;
  description: string | null;
}

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [links, setLinks] = useState<Link[]>([]);

  const createUrl = async (): Promise<void> => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original_url: searchTerm })
    }

    const response = await fetch("http://localhost:3000/api/v1/urls", options);
    const data = await response.json();
    console.log("data es:");
    console.log(data);
    setLinks([...links, data]);
    console.log(links);
    setSearchTerm("");
  }

  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links])

  return (
    <>
      <div className=" relative flex flex-col justify-center items-center overflow-hidden z-1 px-20 pb-20 w-full">
        <div className="absolute w-[50%] h-[40%] -z-10 blur-[120px] bg-radial-[at_50%_75%] from-primary to-primary/10 rounded-full opacity-70">
        </div>
        <h1 className="text-6xl mt-20 mb-10 font-black text-center">Simplify Your Links.
          <br />
          <span className="text-primary">
            Broaden Your Reach.</span>
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} createUrl={createUrl} />

        {links.length > 0 ? 
        (links.map((link: Link) => (
        <LinkCard key={link.id} link={link} />
      )))
        : (
          <div className="mt-14 border-dashed border-2 border-slate-700 rounded-xl p-10 flex flex-col items-center gap-4 bg-primary/5">
            <div className="rounded-full bg-white/5 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-amber-300-r" height="30" viewBox="0 0 24 24" width="30" fill="#62748e"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z"/><polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93"/><polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"/></g></g></svg>
            </div>
            <p className=" font-bold ">No links shortened yet</p>
            <p className="text-slate-500 text-sm">Your shortened link and analytics will appear here once you process a URL.</p>
          </div>
        )}
      </div>
      
      
    </>



  )
}
