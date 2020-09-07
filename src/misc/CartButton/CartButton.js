import React, { useState, useMemo } from "react";
import s from "./CartButton.module.css";
import Button from "../Button/Button";
import { CSSTransition } from "react-transition-group";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import { connect } from "react-redux";
import classnames from "classnames";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Bag } from "../../assets/shopping-bag.svg";

const CartButton = ({ product, cartProducts, removeFromCart, addToCart }) => {
  const { _id } = product;

  const isInCart = useMemo(
    () =>
      !!cartProducts.filter((cartProduct) => cartProduct._id === _id).length,
    [cartProducts, _id]
  );

  const [isAnimation, setAnimation] = useState(false);

  const animation = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  const removeFromCartHandler = () => {
    animation();
    removeFromCart(product);
  };

  const addToCartHandler = () => {
    animation();
    addToCart({ ...product, numberInCart: 1 });
  };

  return (
    <Button
      className={classnames(s.card__button, {
        [s.active__card__button]: isInCart,
      })}
      isRound
      size="sm"
      onClick={isInCart ? removeFromCartHandler : addToCartHandler}
    >
      <CSSTransition
        in={isAnimation}
        timeout={200}
        classNames={{
          enterActive: s.cart__icon__entering,
          enterDone: s.cart__icon__entered,
          exitActive: s.cart__icon__exiting,
          exitDone: s.cart__icon__exited,
        }}
      >
        {isInCart ? <Check /> : <Bag />}}
      </CSSTransition>
    </Button>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
