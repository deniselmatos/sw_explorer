import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import "./styles/Favorites.css";

function Favorites() {
  const { favorites } = useFavorites();
  const [filter, setFilter] = useState("all");

  const watched = JSON.parse(localStorage.getItem("watchedFilms")) || [];

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter(f => f.type === filter);

  const progress = watched.length
    ? (watched.length / 9) * 100
    : 0;

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">
        Favorites and Lists
      </h2>

      {/* FILTRO */}
      {favorites.length > 0 && (
        <div style={{ marginBottom: 25 }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="film">Films</option>
            <option value="character">Characters</option>
            <option value="planet">Planets</option>
            <option value="starship">Starships</option>
            <option value="species">Species</option>
          </select>
        </div>
      )}

      {/* LISTA FILTRADA */}
      {favorites.length === 0 && (
        <p>No favorites added yet.</p>
      )}

      {favorites.length > 0 && filtered.length === 0 && (
        <p>No favorites of this type.</p>
      )}

      <div className="favorites-grid">
        {filtered.map(item => (
          <div key={item.id} className="favorite-card">
            {item.data.name || item.data.title}
            <p style={{ fontSize: "12px", opacity: 0.6 }}>
              {item.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;