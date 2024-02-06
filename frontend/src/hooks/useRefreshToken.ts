import axios from "@/api/axios";
import { useAuthContext } from "@/context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      navigate("/auth", { state: { from: location }, replace: true });
    }
  };
  return refresh;
};

export default useRefreshToken;
