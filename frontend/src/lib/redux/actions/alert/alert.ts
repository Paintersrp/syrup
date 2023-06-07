export const ALERT_FAIL = "ALERT_FAIL";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_INFO = "ALERT_INFO";
export const ALERT_WARNING = "ALERT_WARNING";
export const CLOSE_ALERT = "CLOSE_ALERT";
export const DATA_UPDATED = "DATA_UPDATED";

export interface AlertSuccessAction {
  type: typeof ALERT_SUCCESS;
  message: string;
}

export interface AlertFailAction {
  type: typeof ALERT_FAIL;
  message: string;
}

export interface AlertWarningAction {
  type: typeof ALERT_WARNING;
  message: string;
}

export interface AlertInfoAction {
  type: typeof ALERT_INFO;
  message: string;
}

export interface CloseAlertAction {
  type: typeof CLOSE_ALERT;
}

export interface DataUpdatedAction {
  type: typeof DATA_UPDATED;
  data: any;
}

export const alertFail = (message: string): AlertFailAction => ({
  type: ALERT_FAIL,
  message: message,
});

export const alertInfo = (message: string): AlertInfoAction => ({
  type: ALERT_INFO,
  message: message,
});

export const alertSuccess = (message: string): AlertSuccessAction => ({
  type: ALERT_SUCCESS,
  message: message,
});

export const alertWarning = (message: string): AlertWarningAction => ({
  type: ALERT_WARNING,
  message: message,
});

export const closeAlert = (): CloseAlertAction => ({
  type: CLOSE_ALERT,
});

export const dataUpdated = (data: any): DataUpdatedAction => ({
  type: DATA_UPDATED,
  data: { data },
});
