import {
  SET_JOBS,
  SET_USERS,
  SET_SERVICES,
  SetJobsAction,
  SetUsersAction,
  SetServicesAction,
} from "../Actions/plugins";

export interface PluginState {
  jobsPlugin: boolean;
  usersPlugin: boolean;
  servicesPlugin: boolean;
}

const initialState: PluginState = {
  jobsPlugin: false,
  usersPlugin: false,
  servicesPlugin: false,
};

type PluginActionTypes =
  | SetJobsAction
  | SetUsersAction
  | SetServicesAction
  | any;

const pluginReducer = (
  state: PluginState = initialState,
  action: PluginActionTypes
): PluginState => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        jobsPlugin: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        usersPlugin: action.payload,
      };
    case SET_SERVICES:
      return {
        ...state,
        servicesPlugin: action.payload,
      };
    default:
      return state;
  }
};

export default pluginReducer;
