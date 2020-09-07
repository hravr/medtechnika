import {
  SET_CITIES,
  SET_WAREHOUSES,
  SET_SELECTED_WAREHOUSE,
  SET_SELECTED_CITY,
} from "../actions/actionTypes";

const initialState = {
  cities: [],
  warehouses: [],
  selectedCity: "",
  selectedWarehouse: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.warehouses,
      };
    case SET_SELECTED_WAREHOUSE:
      return {
        ...state,
        selectedWarehouse: action.warehouse,
      };
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.city,
      };
    default:
      return state;
  }
};
