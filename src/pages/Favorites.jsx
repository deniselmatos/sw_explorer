import { useState } from "react";
import { useApp } from "../context/AppContext";

function Favorites() {
  const {
    favorites,
    films,
    orderType,
    setOrderType,
    moveFilm
  } = useApp();

  const [filter, setFilter] = useState("all");
  const [blockedId, setBlockedId] = useState(null);

  /* =========================
     FAVORITES FILTER
  ==========================*/

  const filteredFavorites =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.type === filter);

  /* =========================
     SORT FILMS
  ==========================*/

  const sortedFilms = [...films].sort((a, b) => {
    if (orderType === "release") {
      return new Date(a.release_date) - new Date(b.release_date);
    }
    return a.episode_id - b.episode_id;
  });

  const toWatch = sortedFilms.filter(
    (f) => f.status[orderType] === "toWatch"
  );

  const watching = sortedFilms.filter(
    (f) => f.status[orderType] === "watching"
  );

  const watched = sortedFilms.filter(
    (f) => f.status[orderType] === "watched"
  );

  function handleMove(id, status) {
    const allowed = moveFilm(id, status);
    setBlockedId(allowed ? null : id);
  }

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>

      {/* FILTER TABS */}
      <div className="tabs">
        {["all","film","character","planet","species","starship"].map((type) => (
          <button
            key={type}
            className={filter === type ? "active" : ""}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {favorites.length === 0 ? (
        <p>You don't have any favorites yet.</p>
      ) : filteredFavorites.length === 0 ? (
        <p>No favorites in this category.</p>
      ) : (
        <div className="grid">
          {filteredFavorites.map((fav) => (
            <div key={fav.id} className="card">
              <h3>{fav.data.name || fav.data.title}</h3>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* MOVIE CHECKLIST */}
      <h1>Movie Checklist</h1>

      <div className="tabs">
        <button
          className={orderType === "release" ? "active" : ""}
          onClick={() => setOrderType("release")}
        >
          Release Order
        </button>

        <button
          className={orderType === "chronological" ? "active" : ""}
          onClick={() => setOrderType("chronological")}
        >
          Chronological Order
        </button>
      </div>

      {/* USANDO SUA GRID PADRÃO */}
      <div className="grid">

        {/* TO WATCH */}
        <div className="card">
          <h2>To Watch</h2>

          {toWatch.map((film) => (
            <div key={film.id} className="card" style={{ marginBottom: "10px" }}>
              <h3>{film.title}</h3>

              <button onClick={() => handleMove(film.id, "watching")}>
                Start
              </button>

              {blockedId === film.id && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  You must watch the previous movie first.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* WATCHING */}
        <div className="card">
          <h2>Watching</h2>

          {watching.map((film) => (
            <div key={film.id} className="card" style={{ marginBottom: "10px" }}>
              <h3>{film.title}</h3>

              <button onClick={() => handleMove(film.id, "toWatch")}>
                Back
              </button>

              <button onClick={() => handleMove(film.id, "watched")}>
                Finish
              </button>
            </div>
          ))}
        </div>

        {/* WATCHED */}
        <div className="card">
          <h2>Watched</h2>

          {watched.map((film) => (
            <div key={film.id} className="card" style={{ marginBottom: "10px" }}>
              <h3>{film.title}</h3>

              <button onClick={() => handleMove(film.id, "watching")}>
                Rewatch
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Favorites;