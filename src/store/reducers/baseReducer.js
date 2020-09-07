import { SET_LOADING, HIDE_MODAL, SHOW_MODAL } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  modalContent: "",
  isModalVisible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case HIDE_MODAL:
      return {
        ...state,
        isModalVisible: false,
      };
    case SHOW_MODAL:
      return {
        ...state,
        isModalVisible: true,
        modalContent: action.content,
        onModalSubmit: action.onSubmit,
        onModalReject: action.onReject,
      };
    default:
      return state;
  }
};
