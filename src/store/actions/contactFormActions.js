import {
  postContactFormMessage,
  fetchContactFormMessages,
  patchMessage,
  deleteMessage,
} from "../api/api";
import {
  SET_LOADING,
  SET_MESSAGES,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
} from "./actionTypes";
import { getAdminToken } from "../../utils/utils";

export const createContactMessageAction = (message) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await postContactFormMessage(message);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const getContactMessagesAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchContactFormMessages(token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: SET_MESSAGES, messages: response.data });
    }
    return response.status === 200;
  };
};

export const readMessageAction = (message, id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await patchMessage({ ...message, read: true }, id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: EDIT_MESSAGE, message: { ...message, read: true } });
    }
  };
};

export const deleteMessageAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteMessage(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: DELETE_MESSAGE, id });
    }
  };
};
