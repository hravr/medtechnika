import { fetchAllNews, fetchSingleNews } from "../api/api";
import { SET_NEWS, SET_SINGLE_NEWS } from "./actionTypes";

export const getAllNewsAction = () => {
  return async (dispatch) => {
    const response = await fetchAllNews();
    if (response.status === 200) {
      const sortedRecent = response.data.sort(
        (news, nextNews) =>
          new Date(nextNews.createdAt) - new Date(news.createdAt)
      );
      dispatch({
        type: SET_NEWS,
        news: response.data,
        recent: sortedRecent,
      });
    }
  };
};

export const getSingleNewsAction = (id) => {
  return async (dispatch) => {
    const response = await fetchSingleNews(id);
    dispatch({ type: SET_SINGLE_NEWS, singleNews: response.data });
  };
};
