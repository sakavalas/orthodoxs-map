import { Link } from "react-router-dom";
export default function SaintSidebar({ saint }) {
  if (!saint) return null;

  return (
    <div className="saint-sidebar">
      <img src={saint.image} alt={saint.name} />

      <h1>{saint.name}</h1>

      <p className="feast">
        Εορτή: {saint.feastLabel}
      </p>

      <p className="bio">
        {saint.bio}
      </p>

      <Link to={`/saint/${saint.id}`} className="sidebar-button">
  Δες τον βίο
</Link>

   <Link
  to={`/saint/${saint.id}/media`}
  className="sidebar-button"
>
  Άκου αφήγηση
</Link>
      {saint.fullBio && (
  <div className="full-bio">
    <h2>Βίος</h2>
    <p>{saint.fullBio}</p>
  </div>
)}
    </div>
  );
}