import {
  TOGGLE_EDITMODE_ON,
  TOGGLE_EDITMODE_OFF,
  ActionTypes,
} from "../actions/editmode";

export interface EditModeState {
  editMode: boolean;
}

const initialState: EditModeState = {
  editMode: false,
};

const editmodeReducer = (
  state: EditModeState = initialState,
  action: ActionTypes
): EditModeState => {
  switch (action.type) {
    case TOGGLE_EDITMODE_ON:
      return {
        ...state,
        editMode: true,
      };
    case TOGGLE_EDITMODE_OFF:
      return {
        ...state,
        editMode: false,
      };
    default:
      return state;
  }
};

export default editmodeReducer;
