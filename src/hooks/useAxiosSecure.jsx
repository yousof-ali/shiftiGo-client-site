import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const secureApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useSecureApi = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = secureApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      secureApi.interceptors.response.eject(interceptor);
    };
  }, [logOut,navigate]);

  return secureApi;
};

export default useSecureApi;
