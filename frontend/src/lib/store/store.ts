import { createStore, combineReducers, Store, ReducersMapObject } from "redux";
import authReducer, { AuthState } from "../reducers/auth";
import snackbarReducer, { SnackbarState } from "../reducers/snackbar";
import pluginsReducer, { PluginState } from "../reducers/plugins";
import editmodeReducer, { EditModeState } from "../reducers/editmode";

export interface RootState {
  auth: AuthState;
  snackbar: SnackbarState;
  plugins: PluginState;
  editMode: EditModeState;
}

const rootReducer: ReducersMapObject<RootState> = {
  auth: authReducer,
  snackbar: snackbarReducer,
  plugins: pluginsReducer,
  editMode: editmodeReducer,
};

const store: Store<RootState> = createStore(combineReducers(rootReducer));

export default store;
