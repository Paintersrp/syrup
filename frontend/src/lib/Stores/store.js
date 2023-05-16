import { createStore, combineReducers } from "redux";
import authReducer from "../Reducers/auth";
import loadingReducer from "../Reducers/loading";
import snackbarReducer from "../Reducers/snackbar";
import pluginsReducer from "../Reducers/plugins";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  snackbar: snackbarReducer,
  plugins: pluginsReducer,
});

const store = createStore(rootReducer);

export default store;
