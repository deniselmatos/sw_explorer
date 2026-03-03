import { useEffect, useState } from "react";
import { getFilms } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [order, setOrder] = useState("release");

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadFilms() {
      const swapiFilms = await getFilms();

      // 🎬 Filmes adicionais (episódios 7, 8 e 9)
      const sequelFilms = [
        {
          title: "Star Wars: The Force Awakens",
          episode_id: 7,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2015-12-18",
          opening_crawl:
            "Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire..."
        },
        {
          title: "Star Wars: The Last Jedi",
          episode_id: 8,
          director: "Rian Johnson",
          producer: "Kathleen Kennedy",
          release_date: "2017-12-15",
          opening_crawl:
            "The FIRST ORDER reigns. Having decimated the peaceful Republic..."
        },
        {
          title: "Star Wars: The Rise of Skywalker",
          episode_id: 9,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2019-12-20",
          opening_crawl:
            "The dead speak! The galaxy has heard a mysterious broadcast..."
        }
      ];

      // 🔥 Junta os dois arrays sem duplicar episódio
      const allFilms = [...swapiFilms, ...sequelFilms];

      const uniqueFilms = Array.from(
        new Map(allFilms.map(f => [f.episode_id, f])).values()
      );

      setFilms(uniqueFilms);
    }

    loadFilms();
  }, []);

  const filtered = films
    .filter(f =>
      f.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "release") {
        return new Date(a.release_date) - new Date(b.release_date);
      }
      if (order === "chronological") {
        return a.episode_id - b.episode_id;
      }
      return 0;
    });

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search film..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />

        <select
          value={order}
          onChange={e => setOrder(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="release">Release Order</option>
          <option value="chronological">
            Chronological Order
          </option>
        </select>
      </div>

      <div className="results-container">
        {filtered.map(f => (
          <div key={f.episode_id} className="result-card">
            <h3>{f.title}</h3>

            <button onClick={() => setSelected(f)}>
              View Details
            </button>

            <button
              onClick={() =>
                toggleFavorite({
                  id: f.episode_id,
                  type: "film",
                  data: f
                })
              }
            >
              {isFavorite(f.episode_id, "film")
                ? "★ Remove"
                : "☆ Favorite"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.title}</h2>
            <p>
              Episode {selected.episode_id} was directed by {selected.director}
              and produced by {selected.producer}. It was released on{" "}
              {selected.release_date}.
            </p>
            <p>{selected.opening_crawl}</p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default FilmList;