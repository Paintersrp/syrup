export const SET_JOBS = "SET_JOBS";
export const SET_SERVICES = "SET_SERVICES";
export const SET_USERS = "SET_USERS";

export interface SetJobsAction {
  type: typeof SET_JOBS;
  payload: any;
}

export interface SetServicesAction {
  type: typeof SET_SERVICES;
  payload: any;
}

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: any;
}

export const setJobs = (jobsPlugin: any): SetJobsAction => {
  return {
    type: SET_JOBS,
    payload: jobsPlugin,
  };
};

export const setServices = (servicesPlugin: any): SetServicesAction => {
  return {
    type: SET_SERVICES,
    payload: servicesPlugin,
  };
};

export const setUsers = (usersPlugin: any): SetUsersAction => {
  return {
    type: SET_USERS,
    payload: usersPlugin,
  };
};
