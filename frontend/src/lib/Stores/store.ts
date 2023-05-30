import { createStore, combineReducers, Store, ReducersMapObject } from "redux";
import authReducer, { AuthState } from "../Reducers/auth";
import snackbarReducer, { SnackbarState } from "../Reducers/snackbar";
import pluginsReducer, { PluginState } from "../Reducers/plugins";
import editmodeReducer, { EditModeState } from "../Reducers/editmode";

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
