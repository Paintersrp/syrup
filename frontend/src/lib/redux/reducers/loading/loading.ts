import {
  TOGGLE_LOADING_ON,
  TOGGLE_LOADING_OFF,
  ActionTypes,
} from "../../actions/loading/loading";

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingReducer = (
  state: LoadingState = initialState,
  action: ActionTypes
): LoadingState => {
  switch (action.type) {
    case TOGGLE_LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case TOGGLE_LOADING_OFF:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
