import { useCallback, useEffect, useState } from 'react';

import localStorageService from '../util/localStorageService';

/**
 * __useLocalStorage__
 *
 * Hook for handling state using Local Storage
 *
 * @param key key for the local storage item
 * @param initialValue fallback value in case the value of the key doesn't exist
 * @returns storedValue - stored Local Storage value and setValue - state setting function
 *
 * @example
 * const [tickets, setTickets] = useLocalStorage<Record<string, Ticket>>(LocalStorageKeysEnum.TICKETS, {});
 *
 *
 */

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorageService.get(key);
      if (!item) return initialValue;
      return item as T;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorageService.set(key, storedValue);
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      try {
        setStoredValue((prevStoredValue) => {
          const newValue =
            value instanceof Function ? value(prevStoredValue) : value;
          return newValue;
        });
      } catch (error) {
        console.error(`Error updating ${key} in localStorage:`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
};
