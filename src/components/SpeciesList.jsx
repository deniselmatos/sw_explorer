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
    async function loadSpecies() {
      const data = await getSpecies();
      setSpecies(data);
    }
    loadSpecies();
  }, []);

  const uniqueClassifications = [
    ...new Set(species.map(s => s.classification))
  ];

  const filtered = species.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchClass =
      classification === "all" || s.classification === classification;
    return matchSearch && matchClass;
  });

  return (
    <div>
      <h2>Species</h2>

      <input
        type="text"
        placeholder="Search species..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={classification}
        onChange={(e) => setClassification(e.target.value)}
      >
        <option value="all">All Classifications</option>
        {uniqueClassifications.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      <div className="grid">
        {filtered.map((item) => (
          <div key={item.name} className="card">
            <h3>{item.name}</h3>

            <button onClick={() => setSelected(item)}>
              View Details
            </button>

            <button
              onClick={() =>
                toggleFavorite({ id: item.name, type: "species", data: item })
              }
            >
              Favorites {isFavorite(item.name, "species") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.name}</h2>
          <p>
            {selected.name} is classified as {selected.classification} and has an average lifespan of {selected.average_lifespan}. 
            They typically speak {selected.language} and have an average height of {selected.average_height} centimeters.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SpeciesList;