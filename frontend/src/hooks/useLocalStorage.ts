import { useState, useEffect } from "react";

const getLocalStorage = (key: string, initialValue: any) => {
  // SSR instance
  if (typeof window === "undefined") return initialValue;

  const localValue = localStorage.getItem(key);
  if (localValue) return localValue;

  if (initialValue instanceof Function) return initialValue();
};

const useLocalStorage = (
  key: string,
  initialValue: string | boolean,
): [
  string | boolean,
  React.Dispatch<React.SetStateAction<string | boolean>>,
] => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
