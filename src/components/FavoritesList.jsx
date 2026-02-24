import { useFavorites } from "../context/FavoritesContext";

function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "30px" }}>
        No favorites added yet.
      </p>
    );
  }

  return (
    <div className="results-container">
      {favorites.map((item) => (
        <div key={item.id} className="result-card">
          <h3>
            {item.data.name || item.data.title}
          </h3>
          <p>Type: {item.type}</p>
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;