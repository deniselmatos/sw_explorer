import { useEffect, useState } from "react";
import { getStarships } from "../services/api";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useApp();

  useEffect(() => {
    async function loadStarships() {
      const data = await getStarships();
      setStarships(data);
    }
    loadStarships();
  }, []);

  const filtered = starships.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Starships</h2>

      <input
        type="text"
        placeholder="Search starship..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((ship) => (
          <div key={ship.url} className="card">
            <h3>{ship.name}</h3>

            <button onClick={() => setSelected(ship)}>
              View Details
            </button>

            <button onClick={() => toggleFavorite(ship, "starship")}>
              Favorite {isFavorite(ship, "starship") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
      <Modal onClose={() => setSelected(null)}>
        <h2>{selected.name}</h2>
        <p>
          {selected.name} is a {selected.starship_class} manufactured by{" "}
          {selected.manufacturer}. It measures{" "}
          {selected.length !== "unknown"
            ? Number(selected.length.replace(",", "")).toLocaleString()
            : "unknown"} meters in length, requires a crew of{" "}
          {selected.crew !== "unknown"
            ? Number(selected.crew.replace(",", "")).toLocaleString()
            : "unknown"} members and can carry up to{" "}
          {selected.passengers !== "unknown"
            ? Number(selected.passengers.replace(",", "")).toLocaleString()
            : "unknown"} passengers.
        </p>
      </Modal>
      )}
    </div>
  );
}

export default StarshipList;