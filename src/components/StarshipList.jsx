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
          <div key={ship.name} className="card">
            <h3>{ship.name}</h3>

            <button onClick={() => setSelected(ship)}>
              View Details
            </button>

            <button
              onClick={() =>
                toggleFavorite({ id: ship.name, type: "starship", data: ship })
              }
            >
              Favorites {isFavorite(ship.name, "starship") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.name}</h2>
          <p>
            {selected.name} is a {selected.starship_class} manufactured by {selected.manufacturer}. 
            It has a length of {selected.length} meters, can carry {selected.crew} crew members and up to {selected.passengers} passengers. 
            The hyperdrive rating is {selected.hyperdrive_rating}.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default StarshipList;