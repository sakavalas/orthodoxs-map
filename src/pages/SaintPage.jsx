import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { saints } from "../data/saints";

export default function SaintPage() {
  const { id } = useParams();
  const saint = saints.find((s) => String(s.id) === id);
  const [expanded, setExpanded] = useState(false);

  if (!saint) {
    return (
      <div className="saint-page">
        <h1>Δεν βρέθηκε ο Άγιος</h1>
        <Link to="/">Επιστροφή στον χάρτη</Link>
      </div>
    );
  }

  return (
    <div className="saint-page">
      <Link to="/" className="back-link">← Επιστροφή στον χάρτη</Link>

      <section className="saint-hero">
        <img src={saint.image} alt={saint.name} />

        <div>
          <p className="page-label">Βίος Αγίου</p>
          <h1>{saint.name}</h1>
          <p className="page-feast">Εορτή: {saint.feastLabel}</p>
          <p className="page-summary">{saint.bio}</p>

          <Link to={`/saint/${saint.id}/media`} className="gold-button">
            Αφηγήσεις & Βίντεο
          </Link>
        </div>
      </section>

      <section className="content-grid">
        <article className="main-content">
         <div className="saint-full-bio">

  <h2>Βιογραφία</h2>

  <p>
    {expanded
      ? (saint.fullBio || saint.bio)
      : (saint.fullBio || saint.bio).slice(0, 1200) + "..."}
  </p>

  <button
    className="expand-btn"
    onClick={() => setExpanded(!expanded)}
  >
    {expanded ? "Λιγότερα" : "Διάβασε όλο τον βίο"}
  </button>

</div>

          <h2>Πνευματικό μήνυμα</h2>
          <p>
            Η ζωή του Αγίου μάς θυμίζει την αξία της ταπείνωσης, της προσευχής,
            της υπομονής και της αγάπης προς τον Θεό και τον άνθρωπο.
          </p>
        </article>

        <aside className="info-card">
          <h3>Στοιχεία</h3>
          <p><strong>Εορτή:</strong> {saint.feastLabel}</p>
          <p><strong>Κύριο σημείο:</strong> {saint.lifePoints?.[0]?.name}</p>

          <h3>Σημεία ζωής</h3>
          {saint.lifePoints.map((point, index) => (
            <div className="life-row" key={index}>
              <span>{point.type}</span>
              <p>{point.name}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="tradition-section">
        <h2>Λειτουργικά κείμενα</h2>
        <div className="tradition-card">
          <h3>Απολυτίκιο</h3>
          <p>
            <p>{saint.apolitikion || saint.bio}</p>
          </p>
        </div>
      </section>
       {saint.apolytikio && (
  <section className="apolytikio-section">

    <h2>Απολυτίκιο (Ηχητικό)</h2>

    <div className="apolytikio-card">

      <iframe
        width="100%"
        height="320"
        src={`https://www.youtube.com/embed/${saint.apolytikio.youtubeId}`}
        title={saint.apolytikio.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h3>{saint.apolytikio.title}</h3>

    </div>

  </section>
)}
      <section className="gallery-section">
        <h2>Αγιογραφίες / Φωτογραφίες</h2>
        <div className="gallery-grid">
          <img src={saint.image} alt={saint.name} />
        </div>
      </section>
    </div>
  );
}