import { useAuthContext } from "@/context/AuthProvider";
import axios from "@/api/axios";
import { INITIAL_AUTH } from "@/context/AuthProvider";

const useLogout = () => {
  const { setAuth } = useAuthContext();

  const logout = async () => {
    await axios.get("/logout", {
      withCredentials: true,
    });
    setAuth(INITIAL_AUTH);
  };
  return logout;
};

export default useLogout;
