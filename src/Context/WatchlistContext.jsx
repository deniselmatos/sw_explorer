import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [orderType, setOrderType] = useState("release");

  const [watchlist, setWatchlist] = useState({
    toWatch: [],
    watching: [],
    watched: []
  });

  // Carrega filmes só uma vez
  useEffect(() => {
    async function fetchFilms() {
      const res = await fetch("https://swapi.dev/api/films/");
      const data = await res.json();

      const films = data.results.map(f => ({
        id: f.episode_id,
        title: f.title,
        release_date: f.release_date,
        episode_id: f.episode_id
      }));

      setWatchlist({
        toWatch: films,
        watching: [],
        watched: []
      });
    }

    fetchFilms();
  }, []);

  // Função que retorna filmes ordenados
  function getSortedFilms(films) {
    const sorted = [...films];

    if (orderType === "release") {
      sorted.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else {
      sorted.sort((a, b) => a.episode_id - b.episode_id);
    }

    return sorted;
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setWatchlist,
        orderType,
        setOrderType,
        getSortedFilms
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}