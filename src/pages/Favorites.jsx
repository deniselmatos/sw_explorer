import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchlist } from "../context/WatchlistContext";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import WatchColumn from "../components/WatchColumn";
import "./styles/favorites.css";

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

    const sourceColumn =
      active.data.current?.sortable?.containerId;

    const targetColumn =
      over.data.current?.sortable?.containerId;

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn === targetColumn) return;

    const movingFilm = watchlist[sourceColumn].find(
      film => film.id === active.id
    );

    if (!movingFilm) return;

    setWatchlist(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        film => film.id !== active.id
      ),
      [targetColumn]: [...prev[targetColumn], movingFilm]
    }));
  }

  const filteredFavorites = favorites.filter(
    fav => fav.type === activeTab
  );

  return (
    <div className="favorites-page">
      <h1>Favorites & Lists</h1>

      {/* FAVORITES */}
      <div className="favorite-filters">
        <button
          className={activeTab === "characters" ? "active" : ""}
          onClick={() => setActiveTab("characters")}
        >
          Characters
        </button>

        <button
          className={activeTab === "planets" ? "active" : ""}
          onClick={() => setActiveTab("planets")}
        >
          Planets
        </button>

        <button
          className={activeTab === "starships" ? "active" : ""}
          onClick={() => setActiveTab("starships")}
        >
          Starships
        </button>

        <button
          className={activeTab === "species" ? "active" : ""}
          onClick={() => setActiveTab("species")}
        >
          Species
        </button>

        <button
          className={activeTab === "film" ? "active" : ""}
          onClick={() => setActiveTab("film")}
        >
          Films
        </button>
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

      {/* WATCHLIST */}
      <div>
        <h2>Movie Checklist</h2>

        <div className="order-filter">
          <select
            value={orderType}
            onChange={e => setOrderType(e.target.value)}
          >
            <option value="release">Release Order</option>
            <option value="chronological">
              Chronological Order
            </option>
          </select>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="watchlist-grid">
            {Object.keys(watchlist).map(column => (
              <SortableContext
                key={column}
                id={column}
                items={watchlist[column].map(f => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <WatchColumn
                  id={column}
                  title={
                    column === "toWatch"
                      ? "To Watch"
                      : column === "watching"
                      ? "Watching"
                      : "Watched"
                  }
                  films={getSortedFilms(watchlist[column])}
                />
              </SortableContext>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default Favorites;