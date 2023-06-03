// Auth
import authReducer from "./reducers/auth";
import { SET_AUTH, SET_USER, setAuth, setUser } from "./actions/auth";
export { authReducer, SET_AUTH, SET_USER, setAuth, setUser };

import type { AuthState } from "./reducers/auth";
export type { AuthState };

// Edit Mode
import editmodeReducer from "./reducers/editmode";
import {
  TOGGLE_EDITMODE_OFF,
  TOGGLE_EDITMODE_ON,
  toggleEditModeOff,
  toggleEditModeOn,
} from "./actions/editmode";

export {
  editmodeReducer,
  TOGGLE_EDITMODE_OFF,
  TOGGLE_EDITMODE_ON,
  toggleEditModeOff,
  toggleEditModeOn,
};

import type { EditModeState } from "./reducers/editmode";
export type { EditModeState };

// Plugins
import pluginReducer from "./reducers/plugins";
import {
  SET_JOBS,
  SET_SERVICES,
  SET_USERS,
  setJobs,
  setUsers,
  setServices,
} from "./actions/plugins";

export {
  pluginReducer,
  SET_JOBS,
  SET_SERVICES,
  SET_USERS,
  setJobs,
  setUsers,
  setServices,
};

import type { PluginState } from "./reducers/plugins";
export type { PluginState };

// Snackbar
import snackbarReducer from "./reducers/snackbar";
import {
  ALERT_FAIL,
  ALERT_SUCCESS,
  ALERT_INFO,
  ALERT_WARNING,
  CLOSE_SNACKBAR,
  DATA_UPDATED,
  alertFail,
  alertInfo,
  alertSuccess,
  alertWarning,
  closeSnackbar,
  dataUpdated,
} from "./actions/snackbar";

export {
  ALERT_FAIL,
  ALERT_SUCCESS,
  ALERT_INFO,
  ALERT_WARNING,
  CLOSE_SNACKBAR,
  DATA_UPDATED,
  alertFail,
  alertInfo,
  alertSuccess,
  alertWarning,
  closeSnackbar,
  dataUpdated,
  snackbarReducer,
};

import type { SnackbarState } from "./reducers/snackbar";
export type { SnackbarState };

// Store
import store from "./store/store";
export { store };
