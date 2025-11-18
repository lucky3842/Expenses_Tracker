import { useState, useEffect, useCallback } from 'react';

// Hook to synchronize state with localStorage and across tabs
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        // Reviver function to correctly parse date strings back into Date objects
        return JSON.parse(item, (k, v) => {
          if (k === 'createdAt' && typeof v === 'string' && v.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)) {
            return new Date(v);
          }
          return v;
        });
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
    return initialValue;
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Manually dispatch a storage event to notify other tabs/windows on the same origin
        window.dispatchEvent(new StorageEvent('storage', { key }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // When the key changes in another tab, update the state
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
