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

  const favoriteFilms = favorites.filter(
    item => item.type === "film"
  );

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
      
     {/* ================= FAVORITES ================= */}
      <h1>⭐ Favorites</h1>

      <h2>Favorite Movies</h2>

      {favoriteFilms.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="favorite-grid">
          {favoriteFilms.map(f => (
            <div key={f.id} className="favorite-card">
              {f.data?.title || f.title}
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* ================= WATCHLIST ================= */}
      <h1 className="watchlist-title">🎬 Film Watchlist</h1>

      {/* ORDER */}
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
        <div className="watchlist-container">
          {Object.keys(watchlist).map(column => (
            <SortableContext
              key={column}
              items={watchlist[column].map(f => f.id)}
              strategy={verticalListSortingStrategy}
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