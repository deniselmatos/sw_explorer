import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);

      // Garante que todos tenham estrutura correta
      return parsed.filter(
        item => item.id && item.type && item.data
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(item) {
    const exists = favorites.find(
      f => f.id === item.id && f.type === item.type
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          f => !(f.id === item.id && f.type === item.type)
        )
      );
    } else {
      setFavorites([...favorites, item]);
    }
  }

  function isFavorite(id, type) {
    return favorites.some(
      f => f.id === id && f.type === type
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}