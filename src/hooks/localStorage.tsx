import { useState } from "react";
type StorageValue<T> = T | null;
type Setter<T> = (value: StorageValue<T>) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Setter<T>] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item) as T;
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      console.error(`Error retrieving item from localStorage: ${key}`, error);
      return null;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  const setValue = (value: StorageValue<T>) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
    setStoredValue(value);
  };

  return [storedValue as T, setValue] as const;
}
