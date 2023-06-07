import axios, { AxiosInstance, AxiosResponse } from "axios";
import cookie from "js-cookie";

const ApiAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

ApiAxiosInstance.interceptors.request.use(
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

ApiAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default ApiAxiosInstance;
