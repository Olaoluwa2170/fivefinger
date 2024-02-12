import useLocalStorage from "./useLocalStorage";

const useToggle = (key: string, initialValue: string | boolean) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggle = (value: string | boolean) => {
    setValue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };
  return [value, toggle];
};

export default useToggle;
