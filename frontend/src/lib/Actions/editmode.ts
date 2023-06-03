export const TOGGLE_EDITMODE_OFF = "TOGGLE_EDITMODE_OFF";
export const TOGGLE_EDITMODE_ON = "TOGGLE_EDITMODE_ON";

interface ToggleEditModeOffAction {
  type: typeof TOGGLE_EDITMODE_OFF;
}

interface ToggleEditModeOnAction {
  type: typeof TOGGLE_EDITMODE_ON;
}

export type ActionTypes = ToggleEditModeOffAction | ToggleEditModeOnAction;

export const toggleEditModeOff = (): ToggleEditModeOffAction => ({
  type: TOGGLE_EDITMODE_OFF,
});

export const toggleEditModeOn = (): ToggleEditModeOnAction => ({
  type: TOGGLE_EDITMODE_ON,
});
