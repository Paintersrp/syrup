import {
  DataUpdatedAction,
  AlertSuccessAction,
  AlertFailAction,
  AlertWarningAction,
  AlertInfoAction,
  CloseAlertAction,
  DATA_UPDATED,
  ALERT_SUCCESS,
  ALERT_FAIL,
  ALERT_WARNING,
  ALERT_INFO,
  CLOSE_ALERT,
} from "../../actions/alert/alert";

export interface AlertState {
  open: boolean;
  message: string | undefined;
  type: string | undefined;
  errorMessage: string;
}

const initialState: AlertState = {
  open: false,
  message: undefined,
  type: undefined,
  errorMessage: "",
};

type AlertActionTypes =
  | DataUpdatedAction
  | AlertSuccessAction
  | AlertFailAction
  | AlertWarningAction
  | AlertInfoAction
  | CloseAlertAction;

const alertReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState => {
  switch (action.type) {
    case DATA_UPDATED:
      return {
        ...state,
        open: true,
        type: "success",
        message: `${action.data} has been updated.`,
      };
    case ALERT_SUCCESS:
      console.log(action);
      return {
        ...state,
        open: true,
        type: "success",
        message: action.message,
      };
    case ALERT_FAIL:
      return {
        ...state,
        open: true,
        type: "error",
        message: `Error: ${action.message}`,
      };
    case ALERT_WARNING:
      return {
        ...state,
        open: true,
        type: "warning",
        message: `Caution: ${action.message}`,
      };
    case ALERT_INFO:
      return {
        ...state,
        open: true,
        type: "info",
        message: action.message,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
        message: "",
        type: "",
      };
    default:
      return state;
  }
};

export default alertReducer;
