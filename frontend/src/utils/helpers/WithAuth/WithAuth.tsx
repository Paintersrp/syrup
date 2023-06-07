import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

// import { setAuth, setUser } from "../../lib/redux";
import { ApiAxiosInstance, handleAuth, handleClearAuth } from "../../../lib";

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      if (Cookies.get("jwt")) {
        ApiAxiosInstance.get("auth/verify/")
          .then((res) => {
            handleAuth(res, dispatch);
            // dispatch(
            //   setAuth({
            //     is_authenticated: res.data.authenticated,
            //   })
            // );
            // dispatch(
            //   setUser({
            //     is_superuser: res.data.is_superuser,
            //     username: res.data.username,
            //   })
            // );

            if (res.data.refreshed_token) {
              Cookies.remove("jwt");
              const expires = new Date(Date.parse(res.data.exp));
              Cookies.set("jwt", res.data.refreshed_token, { expires });
            }
          })
          .catch((err) => {
            handleClearAuth(dispatch);
            // dispatch(setAuth({ is_authenticated: false }));
            // dispatch(
            //   setUser({
            //     is_superuser: false,
            //     username: "",
            //   })
            // );
          });
      } else {
        handleClearAuth(dispatch);
        // dispatch(setAuth({ is_authenticated: false }));
        // dispatch(
        //   setUser({
        //     is_superuser: false,
        //     username: "",
        //   })
        // );
      }
    }, [dispatch]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default WithAuth;
