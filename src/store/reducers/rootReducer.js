import { combineReducers } from "redux";
import mainReducer from "./productsReducer";
import newsReducer from "./newsReducer";
import cartReducer from "./cartReducer";
import singleProductReducer from "./singleProductReducer";
import wishlistReducer from "./wishlistReducer";
import baseReducer from "./baseReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import orderReducer from "./orderReducer";
import adminReducer from "./adminReducer";
import contactFormReducer from "./contactFormReducer";

export default combineReducers({
  products: mainReducer,
  news: newsReducer,
  cart: cartReducer,
  single: singleProductReducer,
  wishlist: wishlistReducer,
  base: baseReducer,
  alert: alertReducer,
  profile: profileReducer,
  order: orderReducer,
  admin: adminReducer,
  contact: contactFormReducer,
});
