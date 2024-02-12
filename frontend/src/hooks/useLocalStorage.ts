import { useState, useEffect } from "react";

const getLocalStorage = (key: string | boolean, initialValue: any) => {
  // SSR instance
  if (typeof window === "undefined") return initialValue;

  const localValue = localStorage.getItem(key.toString());
  if (localValue) return localValue;

  if (initialValue instanceof Function) return initialValue();
};

const useLocalStorage = (
  key: string | boolean,
  initialValue: string | boolean,
): [
  string | boolean,
  React.Dispatch<React.SetStateAction<string | boolean>>,
] => {
  const [value, setValue] = useState<string | boolean>(() => {
    return getLocalStorage(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key.toString(), value.toString());
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
