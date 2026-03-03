import { useEffect, useState } from "react";
import { getFilms } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("release");
  const [selected, setSelected] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadFilms() {
      const data = await getFilms();
      setFilms(data);
    }

    loadFilms();
  }, []);

  // Aplicar busca + ordenação
  const filtered = films
    .filter(f =>
      f.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "release") {
        return new Date(a.release_date) - new Date(b.release_date);
      }
      return a.episode_id - b.episode_id;
    });

  return (
    <div>
      <h2>Films</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="release">Release Order</option>
          <option value="chronological">
            Chronological Order
          </option>
        </select>
      </div>

      <div className="grid">
        {filtered.map((film) => (
          <div key={film.episode_id} className="card">
            <h3>{film.title}</h3>

            <button onClick={() => setSelected(film)}>
              View Details
            </button>

            <button
              onClick={() =>
                toggleFavorite({
                  id: film.episode_id,
                  type: "film",
                  data: film
                })
              }
            >
              Favorites{" "}
              {isFavorite(film.episode_id, "film")
                ? "★"
                : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.title}</h2>
          <p>
            Episode {selected.episode_id} was directed by{" "}
            {selected.director} and produced by{" "}
            {selected.producer}. It was released on{" "}
            {selected.release_date}.
          </p>
          <p>{selected.opening_crawl}</p>
        </Modal>
      )}
    </div>
  );
}

export default FilmList;