import axios from "@/api/axios";
import { logOut } from "@/app/authSlice";
import { useAppDispatch } from "@/app/hooks/hooks";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    await axios.get("/logout", {
      withCredentials: true,
    });
    dispatch(logOut());
  };
  return logout;
};

export default useLogout;
