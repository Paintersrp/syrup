import {
  DataUpdatedAction,
  AlertSuccessAction,
  AlertFailAction,
  AlertWarningAction,
  AlertInfoAction,
  CloseSnackbarAction,
  DATA_UPDATED,
  ALERT_SUCCESS,
  ALERT_FAIL,
  ALERT_WARNING,
  ALERT_INFO,
  CLOSE_SNACKBAR,
} from "../Actions/snackbar";

export interface SnackbarState {
  open: boolean;
  message: string | undefined;
  type: string | undefined;
  errorMessage: string;
}

const initialState: SnackbarState = {
  open: false,
  message: undefined,
  type: undefined,
  errorMessage: "",
};

type SnackbarActionTypes =
  | DataUpdatedAction
  | AlertSuccessAction
  | AlertFailAction
  | AlertWarningAction
  | AlertInfoAction
  | CloseSnackbarAction;

const snackbarReducer = (
  state: SnackbarState = initialState,
  action: SnackbarActionTypes
): SnackbarState => {
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
    case CLOSE_SNACKBAR:
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

export default snackbarReducer;
