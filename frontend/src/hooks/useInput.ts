import useLocalStorage from "./useLocalStorage";

const useInput = (
  initialValue: string,
  key: string,
): [string, () => any, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = (): any => setValue(initialValue);

  return [value, reset, setValue];
};

export default useInput;
