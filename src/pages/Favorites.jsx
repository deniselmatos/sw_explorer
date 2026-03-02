import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchlist } from "../context/WatchlistContext";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy
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

  const [filterType, setFilterType] = useState("all");

  // ================= FILTRO FAVORITOS =================
  const filteredFavorites =
    filterType === "all"
      ? favorites
      : favorites.filter(f => f.type === filterType);

  // ================= DRAG =================
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = Object.keys(watchlist).find(column =>
      watchlist[column].some(f => f.id === active.id)
    );

    const targetColumn =
      over.id in watchlist
        ? over.id
        : Object.keys(watchlist).find(column =>
            watchlist[column].some(f => f.id === over.id)
          );

    if (!sourceColumn || !targetColumn) return;
    if (sourceColumn === targetColumn) return;

    const movingFilm = watchlist[sourceColumn].find(
      f => f.id === active.id
    );

    setWatchlist(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        f => f.id !== active.id
      ),
      [targetColumn]: [...prev[targetColumn], movingFilm]
    }));
  }

  return (
    <div className="favorites-page">

      {/* ================= FAVORITOS ================= */}
      <h1>⭐ Favorites</h1>

      <div className="favorite-filters">
        {["all", "character", "planet", "starship", "species", "film"].map(type => (
          <button
            key={type}
            className={filterType === type ? "active" : ""}
            onClick={() => setFilterType(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="favorite-grid">
        {filteredFavorites.length === 0 ? (
          <p>Nenhum favorito encontrado.</p>
        ) : (
          filteredFavorites.map(item => (
            <div key={item.id} className="favorite-card">
              {item.data?.name || item.data?.title}
            </div>
          ))
        )}
      </div>

      <hr />

      {/* ================= CHECKLIST ================= */}
      <h1>🎬 Film Checklist</h1>

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
          {Object.keys(watchlist).map(column => (
            <SortableContext
              key={column}
              items={watchlist[column].map(f => f.id)}
              strategy={rectSortingStrategy}
            >
              <WatchColumn
                title={
                  column === "toWatch"
                    ? "To Watch"
                    : column === "watching"
                    ? "Watching"
                    : "Watched"
                }
                type={column}
                films={getSortedFilms(watchlist[column])}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>

    </div>
  );
}

export default Favorites;