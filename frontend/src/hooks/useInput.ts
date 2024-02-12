import useLocalStorage from "./useLocalStorage";

const useInput = (
  key: string,
  initialValue: string,
): [
  string | boolean,
  React.Dispatch<React.SetStateAction<string | boolean>>,
] => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  return [value, setValue];
};

export default useInput;
