import { useState, useEffect } from "react";

const useLocalStorage = ({
  key,
}: {
  key: string;
}): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(
    localStorage.getItem(key) as string,
  );
  useEffect(() => {
    localStorage.setItem(key, value?.toString() || "");
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
