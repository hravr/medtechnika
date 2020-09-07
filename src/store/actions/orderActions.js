import { fetchCities, fetchWarehousesByCity, postOrder } from "../api/api";
import {
  SET_CITIES,
  SET_SELECTED_CITY,
  SET_SELECTED_WAREHOUSE,
  SET_WAREHOUSES,
  SET_LOADING,
} from "./actionTypes";
import { getAdminToken, getToken } from "../../utils/utils";

export const getCitiesAction = (filterValue, filterLimit) => {
  return async (dispatch) => {
    const response = await fetchCities(filterValue, filterLimit);
    dispatch({
      type: SET_CITIES,
      cities: response.data.data,
    });
  };
};

export const getWarehousesAction = (city) => {
  return async (dispatch) => {
    const response = await fetchWarehousesByCity(city);
    dispatch({
      type: SET_WAREHOUSES,
      warehouses: response.data.data,
    });
  };
};

export const setSelectedCityAction = (city) => {
  return {
    type: SET_SELECTED_CITY,
    city,
  };
};
export const setSelectedWarehouseAction = (warehouse) => {
  return {
    type: SET_SELECTED_WAREHOUSE,
    warehouse,
  };
};

export const submitOrderAction = (order, type = "user") => {
  return async (dispatch) => {
    let token = getToken();
    if (type === "admin") {
      token = getAdminToken();
    }
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await postOrder(order, token);

    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};
