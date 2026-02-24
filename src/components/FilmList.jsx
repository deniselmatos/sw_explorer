import { useEffect, useState } from "react";
import { getFilms } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [order, setOrder] = useState("release");

  const { toggleFavorite, isFavorite } = useFavorites();

  // ✅ Checklist inteligente (salvo no localStorage)
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem("watchedFilms");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleWatched(id) {
    let updated;

    if (watched.includes(id)) {
      updated = watched.filter(f => f !== id);
    } else {
      updated = [...watched, id];
    }

    setWatched(updated);
    localStorage.setItem("watchedFilms", JSON.stringify(updated));
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US");
  }

  function sortFilms(list, orderType) {
    if (orderType === "chronological") {
      return [...list].sort((a, b) => a.episode_id - b.episode_id);
    }

    return [...list].sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  }

  useEffect(() => {
    async function fetchFilms() {
      setLoading(true);
      try {
        const data = await getFilms();
        setFilms(sortFilms(data, order));
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();
  }, []);

  useEffect(() => {
    setFilms(prev => sortFilms(prev, order));
  }, [order]);

  function toggleExpand(id) {
    setExpanded(expanded === id ? null : id);
  }

  const progress = films.length
    ? (watched.length / films.length) * 100
    : 0;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Star Wars Films
      </h2>

      {/* 🔥 Barra de Progresso */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <p>
          Watched {watched.length} of {films.length} films
        </p>

        <div
          style={{
            height: "12px",
            width: "60%",
            margin: "0 auto",
            background: "#ccc",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "green",
              transition: "width 0.4s ease"
            }}
          />
        </div>
      </div>

      {/* 🔄 Alternar ordem */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>
          Order by:
        </label>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="release">
            Release Order
          </option>
          <option value="chronological">
            Chronological Order
          </option>
        </select>
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading films...
        </p>
      )}

      <div className="results-container">
        {films.map((film) => (
          <div
            key={film.episode_id}
            className="result-card"
          >
            <h3>
              Episode {film.episode_id} — {film.title}
            </h3>

            {/* ⭐ Favorito */}
            <button
              onClick={() =>
                toggleFavorite({
                  id: film.episode_id,
                  type: "film",
                  data: film
                })
              }
            >
              {isFavorite(film.episode_id)
                ? "★ Remove Favorite"
                : "☆ Add Favorite"}
            </button>

            <br /><br />

            {/* ✅ Checklist */}
            <button
              onClick={() =>
                toggleWatched(film.episode_id)
              }
            >
              {watched.includes(film.episode_id)
                ? "✔ Watched"
                : "Mark as Watched"}
            </button>

            <br /><br />

            {/* 📖 Expandir */}
            <button
              onClick={() =>
                toggleExpand(film.episode_id)
              }
            >
              {expanded === film.episode_id
                ? "Hide"
                : "View Details"}
            </button>

            {expanded === film.episode_id && (
              <div style={{ marginTop: "15px" }}>
                <p>
                  <strong>Director:</strong>{" "}
                  {film.director}
                </p>

                <p>
                  <strong>Producer:</strong>{" "}
                  {film.producer}
                </p>

                <p>
                  <strong>Release Date:</strong>{" "}
                  {formatDate(film.release_date)}
                </p>

                <p
                  style={{
                    whiteSpace: "pre-line"
                  }}
                >
                  {film.opening_crawl}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;