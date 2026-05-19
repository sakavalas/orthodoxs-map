import SaintMediaPage from "./pages/SaintMediaPage";
import AppMenu from "./components/AppMenu";
import { saints } from "./data/saints";
import SaintSidebar from "./components/SaintSidebar";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SaintPage from "./pages/SaintPage";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const today = new Date();
const todayString = `${String(today.getDate()).padStart(2, "0")}-${String(
  today.getMonth() + 1
).padStart(2, "0")}`;



function saintIcon(image, isFeastDay) {
  return L.divIcon({
    className: isFeastDay ? "saint-icon feast-day" : "saint-icon",
    html: `
      <div class="saint-icon-wrap">
        <img src="${image}" />
      </div>
    `,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });
}

function App() {
  const [selectedSaint, setSelectedSaint] = useState(null);

 return (
  <Routes>

    <Route
      path="/"
      element={
        <>
          <AppMenu />
          
          <MapContainer
            center={[39.0, 28.0]}
            zoom={5}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {saints.map((saint) => (
              <Marker
                key={saint.id}
                position={saint.mainLocation}
                icon={saintIcon(
                  saint.image,
                  saint.feastDay === todayString
                )}
                eventHandlers={{
                  click: () => setSelectedSaint(saint),
                }}
              >
                <Popup>
                  <div className="popup-card">
                    <img src={saint.image} />
                    <h2>{saint.name}</h2>

                    <p>
                      <strong>Εορτή:</strong> {saint.feastLabel}
                    </p>

                    <p>{saint.bio}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {selectedSaint && (
              <>
                <Polyline
                  positions={selectedSaint.lifePoints.map(
                    (p) => p.position
                  )}
                  className="saint-path"
                />

                {selectedSaint.lifePoints.map((point, index) => (
                  <CircleMarker
                    key={index}
                    center={point.position}
                    radius={9}
                    className="life-point"
                  >
                    <Popup>
                      <div>
                        <h3>{point.type}</h3>
                        <p>{point.name}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </>
            )}
          </MapContainer>

          <SaintSidebar saint={selectedSaint} />
        </>
      }
    />

    <Route
      path="/saint/:id"
      element={<SaintPage />}
    />
    <Route
      path="/saint/:id/media"
      element={<SaintMediaPage />}
    />
  </Routes>
);
}

export default App;