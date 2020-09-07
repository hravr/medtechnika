import { fetchSingleProduct } from "../api/api";
import { SET_PRODUCT, SET_LOADING, CLEAR_PRODUCT } from "./actionTypes";

export const getSingleProductAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchSingleProduct(id);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (!response.data) return;
    dispatch({
      type: SET_PRODUCT,
      product: response.data,
    });
  };
};

export const clearSingleProductAction = () => {
  return { type: CLEAR_PRODUCT };
};
