import axios from "axios";
import { useNavigate } from "react-router-dom";

const $axios = axios.create({
  baseURL: "/api",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("FALCON_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.params = {
        ...config.params,
        BranchCode: localStorage.getItem("FALCON_BRANCH_CODE"),
        PropertyId: localStorage.getItem("FALCON_PROPERTY_ID"),
        HotelId: localStorage.getItem("FALCON_HOTEL_ID"),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const navigate = useNavigate();

      if (status === 401) {
        localStorage.removeItem("token");
        navigate("/sign-in", { replace: true });
      }
    }

    return Promise.reject(error);
  }
);

export default $axios;
