import { useEffect, useReducer } from "react";

type Action<T> =
  | { type: "ADD_ITEM"; payload: T }
  | { type: "REMOVE_ITEM"; payload: T }
  | { type: "CLEAR" }
  | { type: "SET_ITEMS"; payload: T[] };

const storageReducer = <T>(state: T[], action: Action<T>): T[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item !== action.payload);
    case "CLEAR":
      return [];
    case "SET_ITEMS":
      return action.payload;
    default:
      throw new Error("Unhandled action type");
  }
};

const useLocalStorage = <T>(key: string) => {
  const initializer = (): T[] => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from local storage: ", error);
      return [];
    }
  };

  const [storageItems, dispatch] = useReducer(
    storageReducer<T>,
    [],
    initializer
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storageItems));
    } catch (error) {
      console.error("Error saving to local storage: ", error);
    }
  }, [key, storageItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const item = localStorage.getItem(key);
        const parsedItem = item ? JSON.parse(item) : [];
        if (JSON.stringify(parsedItem) !== JSON.stringify(storageItems)) {
          dispatch({ type: "SET_ITEMS", payload: parsedItem });
        }
      } catch (error) {
        console.error("Error reading from local storage: ", error);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [key, storageItems]);

  const addStorageItem = (item: T) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeStorageItem = (item: T) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  return { storageItems, addStorageItem, removeStorageItem, clear };
};

export default useLocalStorage;
