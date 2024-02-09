import { useState, useEffect } from "react";

const useLocalStorage = ({ key }: { key: string }) => {
  const [value, setValue] = useState(localStorage.getItem(key));
  useEffect(() => {
    localStorage.setItem(key, value?.toString() || "");
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
