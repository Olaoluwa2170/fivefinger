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
