import { SHOW_ALERT, HIDE_ALERT } from "../actions/actionTypes";

const initialState = {
  isVisible: false,
  content: "",
  type: "error",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        isVisible: true,
        content: action.content,
        type: action.alertType,
      };

    case HIDE_ALERT:
      return {
        ...state,
        isVisible: false,
      };

    default:
      return state;
  }
};
