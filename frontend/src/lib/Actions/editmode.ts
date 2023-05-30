export const TOGGLE_EDITMODE_ON = "TOGGLE_EDITMODE_ON";
export const TOGGLE_EDITMODE_OFF = "TOGGLE_EDITMODE_OFF";

interface ToggleEditModeOnAction {
  type: typeof TOGGLE_EDITMODE_ON;
}

interface ToggleEditModeOffAction {
  type: typeof TOGGLE_EDITMODE_OFF;
}

export type ActionTypes = ToggleEditModeOnAction | ToggleEditModeOffAction;

export const toggleEditModeOn = (): ToggleEditModeOnAction => ({
  type: TOGGLE_EDITMODE_ON,
});

export const toggleEditModeOff = (): ToggleEditModeOffAction => ({
  type: TOGGLE_EDITMODE_OFF,
});
