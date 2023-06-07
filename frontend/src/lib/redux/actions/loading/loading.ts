export const TOGGLE_LOADING_OFF = "TOGGLE_LOADING_OFF";
export const TOGGLE_LOADING_ON = "TOGGLE_LOADING_ON";

interface ToggleLoadingOffAction {
  type: typeof TOGGLE_LOADING_OFF;
}

interface ToggleLoadingOnAction {
  type: typeof TOGGLE_LOADING_ON;
}

export type ActionTypes = ToggleLoadingOffAction | ToggleLoadingOnAction;

export const toggleLoadingOff = (): ToggleLoadingOffAction => ({
  type: TOGGLE_LOADING_OFF,
});

export const toggleLoadingOn = (): ToggleLoadingOnAction => ({
  type: TOGGLE_LOADING_ON,
});
