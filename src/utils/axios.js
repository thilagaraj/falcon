import axios from "axios";
import { useAlert } from "../hook/AlertContext";
import { useNavigate } from "react-router-dom";

const $axios = axios.create({
  baseURL: "http://reactapi.falconsoftware.in/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("FALCON_TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    const { showAlert } = useAlert();
    showAlert("DEFAULT");
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
   //   const { showAlert } = useAlert();
     // const navigate = useNavigate();

      if (status === 401) {
     //   showAlert("LOGIN");
        localStorage.removeItem("token");
    //    navigate("/sign-in", { replace: true });
      } else if (status >= 500) {
      //  showAlert("DEFAULT");
      } else {
     //   showAlert("WARNING");
      }
    } else {
    //  showAlert("DEFAULT");
    }

    return Promise.reject(error);
  }
);

export default $axios;
