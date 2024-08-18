import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string) => {
  const [storageItems, setStorageItems] = useState<T[]>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from local storage: ", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storageItems));
    } catch (error) {
      console.error("Error saving to local storage: ", error);
    }
  }, [key, storageItems]);

  const addStorageItem = (item: T) => {
    setStorageItems((prev) => [...prev, item]);
  };

  const removeStorageItem = (item: T) => {
    setStorageItems((prev) => prev.filter((i) => i !== item));
  };

  const clear = () => {
    setStorageItems([]);
  };

  return { storageItems, addStorageItem, removeStorageItem, clear };
};

export default useLocalStorage;
