import { IContextType, IUser } from "@/lib/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export const INITIAL_AUTH: IUser = {
  email: "",
  accessToken: "",
};

const INITIAL_STATE: IContextType = {
  auth: INITIAL_AUTH,
  persist: false,
  setAuth: () => {},
  setPersist: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IUser>(INITIAL_AUTH);

  const [persist, setPersist] = useState<boolean>(
    localStorage.getItem("persist") === "true" ? true : false,
  );
  const value = {
    auth,
    persist,
    setAuth: setAuth as Dispatch<SetStateAction<IUser>>,
    setPersist: setPersist as Dispatch<SetStateAction<boolean>>,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
