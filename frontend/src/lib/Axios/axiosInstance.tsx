import axios, { AxiosInstance, AxiosResponse } from "axios";
import cookie from "js-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = cookie.get("jwt");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
