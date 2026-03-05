import { createContext, useContext, useEffect, useState } from "react";
import { getFilms } from "../services/api";

const AppContext = createContext();

export function AppProvider({ children }) {

const [orderType, setOrderType] = useState("release");
const [films, setFilms] = useState([]);


const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  async function loadFilms() {

    const savedStatus =
      JSON.parse(localStorage.getItem("filmStatus")) || {};

    const data = await getFilms();

    const formatted = data.map((film) => ({
      id: `film-${film.episode_id}`,
      title: film.title,
      episode_id: film.episode_id,
      release_date: film.release_date,
      opening_crawl: film.opening_crawl,
      status: savedStatus[`film-${film.episode_id}`] || {
        release: "toWatch",
        chronological: "toWatch"
      }
    }));

    setFilms(formatted);
  }

  loadFilms();
}, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

useEffect(() => {
  if (films.length === 0) return;
  const statusOnly = {};
  films.forEach((film) => {
    statusOnly[film.id] = film.status;
  });
  localStorage.setItem("filmStatus", JSON.stringify(statusOnly));
}, [films]);

  function getSortedFilms(type = orderType) {
    const sorted = [...films];

    if (type === "release") {
      sorted.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else {
      sorted.sort((a, b) => a.episode_id - b.episode_id);
    }

    return sorted;
  }

  function moveFilm(id, newStatus) {
    const sorted = getSortedFilms(orderType);
    const index = sorted.findIndex((f) => f.id === id);

    if (index === -1) return true;

    if (newStatus === "watching" || newStatus === "watched") {
      if (index > 0) {
        const previous = sorted[index - 1];

        if (previous.status[orderType] !== "watched") {
          return false;
        }
      }
    }

    setFilms((prev) =>
      prev.map((film) =>
        film.id === id
          ? {
              ...film,
              status: {
                ...film.status,
                [orderType]: newStatus
              }
            }
          : film
      )
    );

    return true;
  }

  function toggleFavorite(item, type) {
    const id =
      type === "film"
        ? item.id
        : `${type}-${item.url}`;

    const exists = favorites.some((f) => f.id === id);

    if (exists) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } else {
      setFavorites((prev) => [
        ...prev,
        {
          id,
          type,
          data: item
        }
      ]);
    }
  }

  function isFavorite(item, type) {
    const id =
      type === "film"
        ? item.id
        : `${type}-${item.url}`;

    return favorites.some((f) => f.id === id);
  }

  return (
    <AppContext.Provider
      value={{
        films,
        favorites,
        orderType,
        setOrderType,
        getSortedFilms,
        moveFilm,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}