import { IUser, IContextType } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

const INITIAL_AUTH: IUser = {
  email: "",
  password: "",
  accessToken: "",
};

const INITIAL_STATE: IContextType = {
  auth: INITIAL_AUTH,
  setAuth: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IUser>(INITIAL_AUTH);
  const value = {
    auth,
    setAuth: setAuth as Dispatch<SetStateAction<IUser>>,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
