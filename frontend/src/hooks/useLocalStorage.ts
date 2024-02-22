import { useState, useEffect } from "react";

const getLocalStorage = (key: string, initialValue: any) => {
  // SSR instance
  if (typeof window === "undefined") return initialValue;

  const localValue = localStorage.getItem(key);
  if (localValue) return localValue;

  if (!localValue) return initialValue;

  if (initialValue instanceof Function) return initialValue();
};

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
