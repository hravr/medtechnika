import {
  SET_USERS,
  SET_FILTERED_USERS,
  RESET_FILTERED_USERS,
  SET_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  DELETE_CATEGORY,
  ADD_ATTRIBUTE,
  SET_VENDORS,
  DELETE_USER,
  ADD_PRODUCT,
  SET_ORDERS,
  SET_ORDERS_PRODUCTS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  filteredUsers: [],
  attributes: [],
  vendors: [],
  userToEdit: {},
  orders: [],
  ordersProducts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users,
      };
    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.users,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.id),
        filteredUsers: state.filteredUsers.filter(
          (user) => user._id !== action.id
        ),
      };
    case RESET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: state.users,
      };
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.attributes,
      };
    case DELETE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.filter((attr) => attr._id !== action.id),
      };
    case ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: [...state.attributes, action.attribute],
      };
    case SET_VENDORS:
      return {
        ...state,
        vendors: action.vendors,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case SET_ORDERS_PRODUCTS:
      return {
        ...state,
        ordersProducts: {
          ...state.ordersProducts,
          [action.orderId]: action.products,
        },
      };
    default:
      return state;
  }
};
