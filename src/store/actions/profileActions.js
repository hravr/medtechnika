import {
  registerRequest,
  loginRequest,
  fetchUserData,
  patchUser,
  fetchUserHistory,
  loginGoogleRequest,
  loginFacebookRequest,
  fetchExactProducts,
  postAvatar,
} from "../api/api";
import {
  SET_USER_DATA,
  SET_LOADING,
  LOGOUT,
  SET_ADMIN,
  SET_ORDER_HISTORY,
  SET_USER_ORDERS_PRODUCTS,
} from "./actionTypes";
import { getToken } from "../../utils/utils";

export const registerAction = (data) => {
  return async (dispatch) => {
    const response = await registerRequest(data);
    if (response.status === 200) {
      dispatch({ type: SET_USER_DATA, user: response.data.user });
      const { token, aToken } = response.data;
      if (aToken) {
        document.cookie = `aToken=${aToken}; path=/;`;
      }
      if (token) {
        document.cookie = `token=${token}; path=/;`;
      }
    }
    return response?.data?.user?._id;
  };
};

export const loginAction = (data, isRemember) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    if (response.status === 200) {
      if (isRemember) {
        localStorage.setItem("_login", JSON.stringify(data));
      }
      const { token, aToken, isAdmin } = response.data;
      if (aToken && isAdmin) {
        document.cookie = `aToken=${aToken}; path=/;`;
        dispatch({ type: SET_ADMIN });
        return "admin";
      }
      dispatch({ type: SET_USER_DATA, user: response.data.user });

      if (token) {
        document.cookie = `token=${token}; path=/;`;
      }
    }
    return response?.data?.user?._id;
  };
};

export const loginGoogleAction = () => {
  return async () => loginGoogleRequest();
};

export const loginFacebookAction = () => {
  return async () => loginFacebookRequest();
};

export const uploadAvatarAction = (avatar) => {
  return async (dispatch) => {
    const token = getToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await postAvatar(avatar, token);
    dispatch({ type: SET_LOADING, isLoading: false });
  };
};

export const getUserByIdAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchUserData(token);
    if (response.status === 200) {
      dispatch({ type: SET_USER_DATA, user: response.data });
    }

    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const patchUserAction = (user, userToken) => {
  return async (dispatch) => {
    let token = userToken;
    if (!userToken) {
      token = getToken();
    }
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await patchUser(user, token);
    dispatch({ type: SET_LOADING, isLoading: false });
  };
};

export const logoutAction = () => {
  document.cookie = "token=''; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  document.cookie = "aToken=''; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  localStorage.removeItem("_login");
  return {
    type: LOGOUT,
  };
};

export const getUserHistoryAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchUserHistory(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: SET_ORDER_HISTORY, orders: response.data });
    }
    return response.status === 200;
  };
};

export const getUserOrderProductsAction = (order) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const productIds = order.products.map(({ id }) => id).join(",");
    const products = await fetchExactProducts(productIds);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (products) {
      dispatch({
        type: SET_USER_ORDERS_PRODUCTS,
        orderId: order._id,
        products,
      });
    }
  };
};
