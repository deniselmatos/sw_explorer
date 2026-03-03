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

  const filteredFavorites =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.type === filter);

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
    <div>
      <h1>Favorites</h1>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("film")}>Films</button>
        <button onClick={() => setFilter("character")}>Characters</button>
        <button onClick={() => setFilter("planet")}>Planets</button>
        <button onClick={() => setFilter("species")}>Species</button>
        <button onClick={() => setFilter("starship")}>Starships</button>
      </div>

      {favorites.length === 0 ? (
        <p>You don't have any favorites yet.</p>
      ) : filteredFavorites.length === 0 ? (
        <p>No favorites in this category.</p>
      ) : (
        filteredFavorites.map((fav) => (
          <div key={fav.id} style={{ marginBottom: 8 }}>
            <p>{fav.data.name || fav.data.title}</p>
          </div>
        ))
      )}

      <hr />

      <h1>Movie Checklist</h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="radio"
            value="release"
            checked={orderType === "release"}
            onChange={(e) => setOrderType(e.target.value)}
          />
          Release Order
        </label>

        <label style={{ marginLeft: 15 }}>
          <input
            type="radio"
            value="chronological"
            checked={orderType === "chronological"}
            onChange={(e) => setOrderType(e.target.value)}
          />
          Chronological Order
        </label>
      </div>

      <h2>To Watch</h2>
      {toWatch.map((film) => (
        <div key={film.id} style={{ marginBottom: 10 }}>
          <p>{film.title}</p>

          <button onClick={() => handleMove(film.id, "watching")}>
            Start
          </button>

          {blockedId === film.id && (
            <p>You must watch the previous movie first.</p>
          )}
        </div>
      ))}

      <h2>Watching</h2>
      {watching.map((film) => (
        <div key={film.id} style={{ marginBottom: 10 }}>
          <p>{film.title}</p>

          <button onClick={() => handleMove(film.id, "toWatch")}>
            Back
          </button>

          <button onClick={() => handleMove(film.id, "watched")}>
            Finish
          </button>

          {blockedId === film.id && (
            <p>You must watch the previous movie first.</p>
          )}
        </div>
      ))}

      <h2>Watched</h2>
      {watched.map((film) => (
        <div key={film.id} style={{ marginBottom: 10 }}>
          <p>{film.title}</p>

          <button onClick={() => handleMove(film.id, "watching")}>
            Rewatch
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;