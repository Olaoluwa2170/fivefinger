import axios from "@/api/axios";
import { useAuthContext } from "@/context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accesToken;
  };
  return refresh;
};

export default useRefreshToken;
