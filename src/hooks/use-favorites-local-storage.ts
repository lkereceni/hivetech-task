import { useEffect, useState } from "react";
import { GLOBAL_STRINGS } from "../utilities";

const useFavoritesLocalStorage = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const item = localStorage.getItem(GLOBAL_STRINGS.favorites);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from local storage: ", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(GLOBAL_STRINGS.favorites, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving to local storage: ", error);
    }
  }, [GLOBAL_STRINGS.favorites, favorites]);

  const addFavorite = (item: string) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (item: string) => {
    setFavorites((prev) => prev.filter((i) => i !== item));
  };

  const clear = () => {
    setFavorites([]);
  };

  return { favorites, addFavorite, removeFavorite, clear };
};

export default useFavoritesLocalStorage;
