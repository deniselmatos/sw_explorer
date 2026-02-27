import { useEffect, useState } from "react";
import { getSpecies } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [search, setSearch] = useState("");
  const [classification, setClassification] = useState("all");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getSpecies().then(setSpecies);
  }, []);

  const uniqueClassifications = [
    ...new Set(species.map(s => s.classification))
  ];

  const filtered = species.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase());

    const matchClass =
      classification === "all" ||
      s.classification === classification;

    return matchSearch && matchClass;
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Species</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="Search species..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={classification}
          onChange={e => setClassification(e.target.value)}
        >
          <option value="all">All Classifications</option>
          {uniqueClassifications.map((c, i) =>
            <option key={i}>{c}</option>
          )}
        </select>
      </div>

      <div className="results-container">
        {filtered.map(s => (
          <div key={s.name} className="result-card">
            <h3>{s.name}</h3>

            <button onClick={() => setSelected(s)}>
              View Details
            </button>

            <button onClick={() =>
              toggleFavorite({ id: s.name, type: "species", data: s })
            }>
              {isFavorite(s.name, "species") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>
              {selected.name} is classified as {selected.classification}
              {" "}and has an average lifespan of {selected.average_lifespan}.
              {" "}They typically speak {selected.language} and have an
              average height of {selected.average_height} centimeters.
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default SpeciesList;