// Auth
import authReducer from "./Reducers/auth";
import { SET_AUTH, SET_USER, setAuth, setUser } from "./Actions/auth";
export { authReducer, SET_AUTH, SET_USER, setAuth, setUser };

import type { AuthState } from "./Reducers/auth";
export type { AuthState };

// Edit Mode
import editmodeReducer from "./Reducers/editmode";
import {
  TOGGLE_EDITMODE_OFF,
  TOGGLE_EDITMODE_ON,
  toggleEditModeOff,
  toggleEditModeOn,
} from "./Actions/editmode";

export {
  editmodeReducer,
  TOGGLE_EDITMODE_OFF,
  TOGGLE_EDITMODE_ON,
  toggleEditModeOff,
  toggleEditModeOn,
};

import type { EditModeState } from "./Reducers/editmode";
export type { EditModeState };

// Plugins
import pluginReducer from "./Reducers/plugins";
import {
  SET_JOBS,
  SET_SERVICES,
  SET_USERS,
  setJobs,
  setUsers,
  setServices,
} from "./Actions/plugins";

export {
  pluginReducer,
  SET_JOBS,
  SET_SERVICES,
  SET_USERS,
  setJobs,
  setUsers,
  setServices,
};

import type { PluginState } from "./Reducers/plugins";
export type { PluginState };

// Snackbar
import snackbarReducer from "./Reducers/snackbar";
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
} from "./Actions/snackbar";

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

import type { SnackbarState } from "./Reducers/snackbar";
export type { SnackbarState };

// Store
import store from "./Store/store";
export { store };
