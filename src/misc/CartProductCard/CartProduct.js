import React, { useState, useEffect } from "react";
import s from "./CartProduct.module.css";
import { connect } from "react-redux";
import Counter from "../Counter/Counter";
import {
  changeNumberInCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ReactComponent as Times } from "../../assets/times.svg";

const CartProduct = ({
  product,
  changeNumberInCart,
  removeFromCart,
  allProductsInCart,
  isSmall,
}) => {
  const {
    gallery,
    title,
    price,
    _id,
    desc,
    numberInCart = 1,
    selectedAttributesId,
    className,
    selectedAttributesPrice,
  } = product;

  const productPrice = selectedAttributesPrice || price;

  const onCounterChange = (value) =>
    changeNumberInCart(value, _id, allProductsInCart);

  const removeFromCartHandler = () => removeFromCart(product);

  useEffect(() => {}, []);

  return (
    <div className={classnames(s.card, { [s.small]: isSmall })}>
      <div className={s.main}>
        <Link to={`product/${_id}`}>
          <img
            className={s.img}
            src={gallery[0] || require("../../assets/image-placeholder.webp")}
            alt="loading"
          />
        </Link>
        <div className={s.main__content}>
          <Link to={`product/${_id}`}>
            <h4 className={s.title}>{title.slice(0, 15)}</h4>
          </Link>
          <p className={s.category}>{desc.slice(0, 20)}</p>
        </div>
      </div>
      <div className={s.price__wrapper}>
        <span className={s.price}>{productPrice}₴</span>
      </div>
      <div className={s.qty__counter__wrapper}>
        <div className={s.qty__counter}>
          <Counter onChange={onCounterChange} initialValue={numberInCart} />
        </div>
      </div>
      <div className={s.fullprice__container}>
        <span className={s.fullprice}>
          {+numberInCart * +productPrice || 0}₴
        </span>
      </div>
      <div className={s.remove__icon__wrapper}>
        <Times onClick={removeFromCartHandler} className={s.remove__icon} />
      </div>

      <div className={s.mobile}>
        <div className={s.fullprice__container}>
          <span className={s.fullprice}>{numberInCart * price || 0}₴</span>
        </div>
        <div className={s.qty__counter}>
          <Counter onChange={onCounterChange} initialValue={numberInCart} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProductsInCart: state.cart.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeNumberInCart: (value, id, allProducts) =>
      dispatch(changeNumberInCartAction(value, id, allProducts)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
