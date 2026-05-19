import { useState } from "react";
import { Link } from "react-router-dom";
import { saints } from "../data/saints";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function AppMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

 const filteredSaints = saints.filter((saint) =>
  normalizeText(saint.name).includes(normalizeText(search))
);
 

  return (
    <>
      <button className="menu-toggle" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)}>
          <aside className="app-menu" onClick={(e) => e.stopPropagation()}>
            <button className="menu-close" onClick={() => setOpen(false)}>
              ×
            </button>

            <h2>Ορθόδοξος Χάρτης</h2>
            <p className="menu-subtitle">Βίοι Αγίων & Ιεροί Τόποι</p>

            <input
              className="menu-search"
              type="text"
              placeholder="Αναζήτηση Αγίου..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <nav className="menu-links">
              <Link to="/" onClick={() => setOpen(false)}>Χάρτης</Link>
              <a href="#">Άγιοι ημέρας</a>
              <a href="#">Αλφαβητικά</a>
              <a href="#">Τοπικοί Άγιοι</a>
              <a href="#">Απολυτίκια</a>
            </nav>

            <h3>Αποτελέσματα</h3>

            <div className="menu-results">
              {filteredSaints.map((saint) => (
                <Link
                  key={saint.id}
                  to={`/saint/${saint.id}`}
                  onClick={() => setOpen(false)}
                  className="menu-saint"
                >
                  <img src={saint.image} alt={saint.name} />
                  <div>
                    <strong>{saint.name}</strong>
                    <span>{saint.feastLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}