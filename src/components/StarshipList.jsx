import { useEffect, useState } from "react";
import { getStarships } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getStarships().then(setStarships);
  }, []);

  const filtered = starships.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Starships</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="Search starship..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="results-container">
        {filtered.map(s => (
          <div key={s.name} className="result-card">
            <h3>{s.name}</h3>

            <button onClick={() => setSelected(s)}>
              View Details
            </button>

            <button onClick={() =>
              toggleFavorite({ id: s.name, type: "starship", data: s })
            }>
              {isFavorite(s.name, "starship") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>
              {selected.name} is a {selected.starship_class}
              {" "}manufactured by {selected.manufacturer}.
              It has a length of {selected.length} meters,
              can carry {selected.crew} crew members and
              {" "}up to {selected.passengers} passengers.
              The hyperdrive rating is {selected.hyperdrive_rating}.
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default StarshipList;