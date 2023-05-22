import { createStore, combineReducers, Store, ReducersMapObject } from "redux";
import authReducer, { AuthState } from "../Reducers/auth";
import snackbarReducer, { SnackbarState } from "../Reducers/snackbar";
import pluginsReducer, { PluginState } from "../Reducers/plugins";

export interface RootState {
  auth: AuthState;
  snackbar: SnackbarState;
  plugins: PluginState;
}

const rootReducer: ReducersMapObject<RootState> = {
  auth: authReducer,
  snackbar: snackbarReducer,
  plugins: pluginsReducer,
};

const store: Store<RootState> = createStore(combineReducers(rootReducer));

export default store;
