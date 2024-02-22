import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/hooks";
import { setAuth } from "../app/authSlice";

const useRefreshToken = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      dispatch(
        setAuth({
          accessToken: response?.data?.accessToken,
        }),
      );

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      navigate("/auth", { state: { from: location }, replace: true });
    }
  };
  return refresh;
};

export default useRefreshToken;
