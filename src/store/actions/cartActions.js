import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  SET_NUMBER_CART,
  SET_FULL_PRICE,
} from "./actionTypes";
import { getLocalCart } from "../../utils/utils";

export const addToCartAction = (product, attributes) => {
  const localCart = getLocalCart();

  localStorage.setItem(
    "_cart",
    JSON.stringify([
      ...localCart,
      { _id: product._id, attributes, numberInCart: 1 },
    ])
  );
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeFromCartAction = (product) => {
  const localCart = getLocalCart();
  localStorage.setItem(
    "_cart",
    JSON.stringify(
      localCart.filter((cartProduct) => cartProduct._id !== product._id)
    )
  );
  return {
    type: REMOVE_FROM_CART,
    productId: product._id,
  };
};

export const changeNumberInCartAction = (value, id, allCartProducts) => {
  let fullPrice = 0;
  const editedProducts = allCartProducts.map((product) => {
    const editedProduct =
      product._id === id ? { ...product, numberInCart: value } : product;
    fullPrice += product.price * editedProduct.numberInCart;
    return editedProduct;
  });

  const localCart = getLocalCart();

  const editedCart = localCart.map((item) => {
    const { _id } = item;
    return _id === id ? { ...item, numberInCart: value } : item;
  });

  localStorage.setItem("_cart", JSON.stringify(editedCart));

  return {
    type: SET_NUMBER_CART,
    editedProducts,
    fullPrice,
  };
};

export const setFullPriceAction = (fullPrice) => {
  return {
    type: SET_FULL_PRICE,
    fullPrice,
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
