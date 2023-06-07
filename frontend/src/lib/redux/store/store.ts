import { createStore, combineReducers, Store, ReducersMapObject } from "redux";
import {
  alertReducer,
  AlertState,
  authReducer,
  AuthState,
  editmodeReducer,
  EditModeState,
  loadingReducer,
  LoadingState,
  pluginsReducer,
  PluginsState,
} from "../reducers";

export interface RootState {
  alert: AlertState;
  auth: AuthState;
  editMode: EditModeState;
  loading: LoadingState;
  plugins: PluginsState;
}

const rootReducer: ReducersMapObject<RootState> = {
  alert: alertReducer,
  auth: authReducer,
  editMode: editmodeReducer,
  loading: loadingReducer,
  plugins: pluginsReducer,
};

const store: Store<RootState> = createStore(combineReducers(rootReducer));

export default store;
