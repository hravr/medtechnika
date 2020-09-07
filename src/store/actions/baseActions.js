import { SET_LOADING, HIDE_MODAL, SHOW_MODAL } from "./actionTypes";

export const setLoadingAction = (isLoading) => {
  return {
    type: SET_LOADING,
    isLoading,
  };
};

export const hideModalAction = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const showModalAction = (
  content,
  onSubmit = () => {},
  onReject = () => {}
) => {
  return {
    type: SHOW_MODAL,
    content,
    onSubmit,
    onReject,
  };
};
