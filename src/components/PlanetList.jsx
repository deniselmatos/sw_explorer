import { useEffect, useState } from "react";
import { getPlanets } from "../services/api";
import Modal from "./Modal";
import { useFavorites } from "../context/FavoritesContext";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const [climate, setClimate] = useState("all");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getPlanets().then(setPlanets);
  }, []);

  const filtered = planets.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase());

    const matchClimate =
      climate === "all" || p.climate === climate;

    return matchSearch && matchClimate;
  });

  const uniqueClimates = [...new Set(planets.map(p => p.climate))];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Planets</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="Search planet..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={climate} onChange={e => setClimate(e.target.value)}>
          <option value="all">All Climates</option>
          {uniqueClimates.map((c,i) =>
            <option key={i}>{c}</option>
          )}
        </select>
      </div>

      <div className="results-container">
        {filtered.map(p => (
          <div key={p.name} className="result-card">
            <h3>{p.name}</h3>

            <button onClick={() => setSelected(p)}>
              View Details
            </button>

            <button onClick={() =>
              toggleFavorite({ id: p.name, type: "planet", data: p })
            }>
              {isFavorite(p.name, "planet") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>
              {selected.name} has a climate described as {selected.climate},
              terrain mainly composed of {selected.terrain}, and a population
              of {selected.population}. The planet diameter is
              {" "} {selected.diameter} kilometers.
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default PlanetList;