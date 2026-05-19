import { Link, useParams } from "react-router-dom";
import { saints } from "../data/saints";

export default function SaintMediaPage() {
  const { id } = useParams();
  const saint = saints.find((s) => String(s.id) === id);

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
      <Link to={`/saint/${saint.id}`} className="back-link">
        ← Επιστροφή στον βίο
      </Link>

      <section className="media-hero">
        <img src={saint.image} alt={saint.name} />

        <div>
          <p className="page-label">Αφηγήσεις & Βίντεο</p>

          <h1>{saint.name}</h1>

          <p className="page-feast">
            Εορτή: {saint.feastLabel}
          </p>

          <p className="page-summary">
            Εδώ θα συγκεντρώνονται αφηγήσεις, βίντεο, ντοκιμαντέρ,
            σύντομες ιστορίες για παιδιά και οπτικοακουστικό υλικό
            για τον Άγιο.
          </p>
        </div>
      </section>

      <section className="media-grid">

        {/* Static Cards */}

        <div className="media-card">
          <div className="video-placeholder">🎧</div>

          <h3>Σύντομη αφήγηση βίου</h3>

          <p>
            Μικρή αφήγηση 2–5 λεπτών με βασικά σημεία από τον βίο.
          </p>
        </div>

        <div className="media-card">
          <div className="video-placeholder">👦</div>

          <h3>Βίος για παιδιά</h3>

          <p>
            Απλή παρουσίαση με πιο κατανοητή γλώσσα για μικρές ηλικίες.
          </p>
        </div>

        <div className="media-card">
          <div className="video-placeholder">📖</div>

          <h3>Ντοκιμαντέρ / Ομιλίες</h3>

          <p>
            Μελλοντικά εδώ θα προστεθούν ομιλίες και ντοκιμαντέρ.
          </p>
        </div>


        {/* Dynamic YouTube Videos */}

        {saint.media?.map((video, index) => (
          <div className="media-card" key={index}>

            <div className="video-frame">
              <iframe
                width="100%"
                height="220"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <h3>{video.title}</h3>

            {video.description && (
              <p>{video.description}</p>
            )}

          </div>
        ))}

      </section>
    </div>
  );
}