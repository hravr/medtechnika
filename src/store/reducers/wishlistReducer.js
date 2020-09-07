import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST,
} from "../actions/actionTypes";

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        all: [...state.all, action.product],
      };
    case SET_WISHLIST:
      return {
        ...state,
        all: action.wishlist,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        all: state.all.filter(
          (wishlistProduct) => wishlistProduct._id !== action.product._id
        ),
      };
    default:
      return state;
  }
};
