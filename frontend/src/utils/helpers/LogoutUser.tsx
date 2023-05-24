import Cookies from "js-cookie";
import AxiosInstance from "./ApiAxiosInstance";

const LogoutUser = (): void => {
  if (Cookies.get("jwt")) {
    AxiosInstance.get("/auth/logout/")
      .then(() => {
        Cookies.remove("jwt");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.href = "/";
  }
};

export default LogoutUser;
