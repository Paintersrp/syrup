import { Dispatch } from "redux";
import { setAuth, setUser } from "../../../redux";

export default function handleClearAuth(dispatch: Dispatch): void {
  dispatch(setAuth({ is_authenticated: false }));
  dispatch(
    setUser({
      is_superuser: false,
      username: "",
    })
  );
}
