import { useEffect, useState } from "react";
import { getPlanets } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const [climate, setClimate] = useState("all");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadPlanets() {
      const data = await getPlanets();
      setPlanets(data);
    }
    loadPlanets();
  }, []);

  const uniqueClimates = [...new Set(planets.map(p => p.climate))];

  const filtered = planets.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchClimate = climate === "all" || p.climate === climate;
    return matchSearch && matchClimate;
  });

  return (
    <div>
      <h2>Planets</h2>

      <input
        type="text"
        placeholder="Search planet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={climate}
        onChange={(e) => setClimate(e.target.value)}
      >
        <option value="all">All Climates</option>
        {uniqueClimates.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      <div className="grid">
        {filtered.map((planet) => (
          <div key={planet.name} className="card">
            <h3>{planet.name}</h3>

            <button onClick={() => setSelected(planet)}>
              View Details
            </button>

            <button
              onClick={() =>
                toggleFavorite({ id: planet.name, type: "planet", data: planet })
              }
            >
              Favorites {isFavorite(planet.name, "planet") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.name}</h2>
          <p>
            {selected.name} has a {selected.climate} climate and terrain mainly composed of {selected.terrain}. 
            It has a population of {selected.population !== "unknown"
              ? Number(selected.population).toLocaleString()
              : "unknown"} inhabitants and a diameter of {selected.diameter !== "unknown"
              ? Number(selected.diameter).toLocaleString()
              : "unknown"} km.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default PlanetList;