import { createContext, useContext, useEffect, useState } from "react";
import { getFilms } from "../services/api";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [orderType, setOrderType] = useState("release");

  const [watchlist, setWatchlist] = useState({
    toWatch: [],
    watching: [],
    watched: []
  });

  useEffect(() => {
    async function loadFilms() {
      const swapiFilms = await getFilms();

      const sequelFilms = [
        {
          title: "Star Wars: The Force Awakens",
          episode_id: 7,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2015-12-18"
        },
        {
          title: "Star Wars: The Last Jedi",
          episode_id: 8,
          director: "Rian Johnson",
          producer: "Kathleen Kennedy",
          release_date: "2017-12-15"
        },
        {
          title: "Star Wars: The Rise of Skywalker",
          episode_id: 9,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2019-12-20"
        }
      ];

      const allFilms = [...swapiFilms, ...sequelFilms].map(f => ({
        id: f.episode_id,
        title: f.title,
        release_date: f.release_date,
        episode_id: f.episode_id
      }));

      setWatchlist({
        toWatch: allFilms,
        watching: [],
        watched: []
      });
    }

    loadFilms();
  }, []);

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