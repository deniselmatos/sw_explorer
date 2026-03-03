import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchlist } from "../context/WatchlistContext";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import WatchColumn from "../components/WatchColumn";

import "./styles/Favorites.css";

function Favorites() {
  const { favorites } = useFavorites();
  const {
    watchlist,
    setWatchlist,
    orderType,
    setOrderType,
    getSortedFilms
  } = useWatchlist();

  const [activeTab, setActiveTab] = useState("characters");

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    let sourceColumn = null;
    let targetColumn = null;

    // Descobre coluna origem
    Object.keys(watchlist).forEach(column => {
      if (watchlist[column].some(f => f.id === active.id)) {
        sourceColumn = column;
      }
    });

    // Se soltou direto na coluna
    if (watchlist[over.id]) {
      targetColumn = over.id;
    } else {
      // Se soltou em cima de outro card
      Object.keys(watchlist).forEach(column => {
        if (watchlist[column].some(f => f.id === over.id)) {
          targetColumn = column;
        }
      });
    }

    if (!sourceColumn || !targetColumn) return;
    if (sourceColumn === targetColumn) return;

    const film = watchlist[sourceColumn].find(f => f.id === active.id);

    setWatchlist(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(f => f.id !== active.id),
      [targetColumn]: [...prev[targetColumn], film]
    }));
  }

  const filteredFavorites = favorites.filter(
    fav => fav.type === activeTab
  );

  return (
    <div className="favorites-page">
      <h1>Favorites & Watchlist</h1>

      {/* FAVORITES */}
      <div className="favorites-section">
        <div className="favorite-filters">
          <button onClick={() => setActiveTab("characters")}>Characters</button>
          <button onClick={() => setActiveTab("planets")}>Planets</button>
          <button onClick={() => setActiveTab("starships")}>Starships</button>
          <button onClick={() => setActiveTab("species")}>Species</button>
          <button onClick={() => setActiveTab("film")}>Films</button>
        </div>

        <div className="favorite-grid">
          {filteredFavorites.length === 0 && (
            <p>No favorites added.</p>
          )}

          {filteredFavorites.map(fav => (
            <div key={fav.id} className="favorite-card">
              <h3>{fav.data?.name || fav.data?.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKLIST */}
      <div>
        <h2>Movie Checklist</h2>

        <div className="order-filter">
          <label>
            <input
              type="radio"
              value="release"
              checked={orderType === "release"}
              onChange={() => setOrderType("release")}
            />
            Release Order
          </label>

          <label>
            <input
              type="radio"
              value="chronological"
              checked={orderType === "chronological"}
              onChange={() => setOrderType("chronological")}
            />
            Chronological Order
          </label>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="watchlist-grid">
            <WatchColumn
              id="toWatch"
              title="To Watch"
              films={getSortedFilms(watchlist.toWatch)}
            />

            <WatchColumn
              id="watching"
              title="Watching"
              films={getSortedFilms(watchlist.watching)}
            />

            <WatchColumn
              id="watched"
              title="Watched"
              films={getSortedFilms(watchlist.watched)}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default Favorites;