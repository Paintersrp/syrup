import Cookies from "js-cookie";
import ApiAxiosInstance from "./ApiAxiosInstance";

const LogoutUser = (): void => {
  if (Cookies.get("jwt")) {
    ApiAxiosInstance.get("/auth/logout/")
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
