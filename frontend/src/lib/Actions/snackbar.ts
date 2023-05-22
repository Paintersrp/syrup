export const DATA_UPDATED = "DATA_UPDATED";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_FAIL = "ALERT_FAIL";
export const ALERT_WARNING = "ALERT_WARNING";
export const ALERT_INFO = "ALERT_INFO";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export interface DataUpdatedAction {
  type: typeof DATA_UPDATED;
  payload: {
    data: object;
  };
}

export interface AlertSuccessAction {
  type: typeof ALERT_SUCCESS;
  payload: {
    message: string;
  };
}

export interface AlertFailAction {
  type: typeof ALERT_FAIL;
  payload: {
    message: string;
  };
}

export interface AlertWarningAction {
  type: typeof ALERT_WARNING;
  payload: {
    message: string;
  };
}

export interface AlertInfoAction {
  type: typeof ALERT_INFO;
  payload: {
    message: string;
  };
}

export interface CloseSnackbarAction {
  type: typeof CLOSE_SNACKBAR;
}

export const dataUpdated = (data: any): DataUpdatedAction => ({
  type: DATA_UPDATED,
  payload: { data },
});

export const alertSuccess = (message: string): AlertSuccessAction => ({
  type: ALERT_SUCCESS,
  payload: { message },
});

export const alertFail = (message: string): AlertFailAction => ({
  type: ALERT_FAIL,
  payload: { message },
});

export const alertWarning = (message: string): AlertWarningAction => ({
  type: ALERT_WARNING,
  payload: { message },
});

export const alertInfo = (message: string): AlertInfoAction => ({
  type: ALERT_INFO,
  payload: { message },
});

export const closeSnackbar = (): CloseSnackbarAction => ({
  type: CLOSE_SNACKBAR,
});
