import useLocalStorage from "./useLocalStorage";

function useInput(
  key: string,
  initialValue: string,
): [string, () => void, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => localStorage.setItem(key, initialValue);

  return [value, reset, setValue];
}

export default useInput;
