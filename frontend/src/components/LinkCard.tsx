import type { Link } from "../pages/Home";

interface LinkCardProps {
  link: Link;
}

export const LinkCard = ({link}:LinkCardProps) => {
  const { original_url, short_code, clicks } = link;
  return (
    <div className="link-card">
      <p className="text-sm text-gray-500">{original_url}</p>
      <a className="text-lg font-bold text-primary" href={`http://localhost:3000/${short_code}`}>localhost:3000/{short_code}</a>
      <p className="text-sm text-gray-500">Clicks: {clicks}</p>
    </div>
  )
}
