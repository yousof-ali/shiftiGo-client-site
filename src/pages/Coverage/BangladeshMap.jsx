import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import districts from "../../../public/districts.json";

const center = [23.685, 90.3563];

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToDistrict({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14, { duration: 1.5 });
    }
  }, [coords, map]);

  return null;
}

const BangladeshMap = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const markerRefs = useRef({});


  const handleSearch = (e) => {
    e.preventDefault();

    const district = districts.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (!district) return;

    setActiveCoords([district.latitude, district.longitude]);
    setActiveDistrict(district.district);

    setTimeout(() => {
      markerRefs.current[district.district]?.openPopup();
    }, 700);
  };

  return (
    <div className="h-[700px] relative w-full rounded-lg overflow-hidden shadow-lg">
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="absolute top-5 right-5 z-[1000] flex w-full max-w-md rounded-md bg-white shadow"
      >
        <input
          type="text"
          placeholder="Search District..."
          className="flex-1 px-4 py-2 border rounded-l-md outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-r-md"
        >
          Go
        </button>
      </form>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToDistrict coords={activeCoords} />

        {districts.map((item, index) => (
          <Marker
            key={index}
            ref={(ref) => (markerRefs.current[item.district] = ref)}
            position={[item.latitude, item.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{item.city}</p>
                <p>District: {item.district}</p>
                <p>Region: {item.region}</p>
                <p>Status: {item.status}</p>
                <p className="mt-1">
                  Covered Areas:
                  <br />
                  {item.covered_area.join(", ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
