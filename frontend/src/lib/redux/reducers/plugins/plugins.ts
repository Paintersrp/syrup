import {
  SET_JOBS,
  SET_USERS,
  SET_SERVICES,
  SetJobsAction,
  SetUsersAction,
  SetServicesAction,
} from "../../actions/plugins/plugins";

export interface PluginsState {
  jobsPlugin: boolean;
  usersPlugin: boolean;
  servicesPlugin: boolean;
}

const initialState: PluginsState = {
  jobsPlugin: false,
  usersPlugin: false,
  servicesPlugin: false,
};

type PluginsActionTypes =
  | SetJobsAction
  | SetUsersAction
  | SetServicesAction
  | any;

const pluginsReducer = (
  state: PluginsState = initialState,
  action: PluginsActionTypes
): PluginsState => {
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

export default pluginsReducer;
