import useLocalStorage from "./useLocalStorage";

const useToggle = (
  key: string,
  initialValue: string | boolean,
): [string | boolean, () => void] => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggle = () => {
    setValue((prev) => {
      return !prev;
    });
  };
  return [value, toggle];
};

export default useToggle;
