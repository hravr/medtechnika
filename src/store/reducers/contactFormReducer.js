import {
  SET_MESSAGES,
  ADD_MESSAGE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };

    case EDIT_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message._id === action.message._id ? action.message : message
        ),
      };

    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message._id !== action.id),
      };

    default:
      return state;
  }
};
