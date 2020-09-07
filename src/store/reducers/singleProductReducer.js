import { SET_PRODUCT, CLEAR_PRODUCT } from "../actions/actionTypes";

const initialState = {
  product: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
      };
    default:
      return state;
  }
};
