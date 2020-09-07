import { SET_NEWS, SET_SINGLE_NEWS, DELETE_NEWS } from "../actions/actionTypes";

const initialState = {
  recent: [],
  all: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return { ...state, all: action.news, recent: action.recent };
    case SET_SINGLE_NEWS:
      return { ...state, single: action.singleNews };
    case DELETE_NEWS:
      return {
        ...state,
        all: state.all.filter((news) => news._id !== action.id),
        recent: state.recent.filter((news) => news._id !== action.id),
      };
    default:
      return state;
  }
};
