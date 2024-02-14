import useLocalStorage from "./useLocalStorage";

const useInput = (
  key: string,
  initialValue: string,
): [
  string | boolean,
  () => void,
  React.Dispatch<React.SetStateAction<string | boolean>>,
] => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => localStorage.setItem(key, initialValue);

  return [value, reset, setValue];
};

export default useInput;
