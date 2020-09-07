import React, { useEffect, useState } from "react";
import s from "./Cart.module.css";
import { connect } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
  setFullPriceAction,
} from "../../store/actions/cartActions";
import CartProduct from "../../misc/CartProductCard/CartProduct";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../misc/Button/Button";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { useHistory } from "react-router-dom";
import { showAlertAction } from "../../store/actions/alertActions";
import GoCatalogBtn from "../../misc/GoCatalogBtn/GoCatalogBtn";
import { ReactComponent as Home } from "../../assets/home.svg";

const Cart = ({ cartProducts, fullPrice, setFullPrice, showAlert, user }) => {
  const h = useHistory();

  const onSubmit = () => {
      h.push("/order");
  };

  useEffect(() => {
    setFullPrice(
      cartProducts.reduce(
        (acc, { price, numberInCart = 1, selectedAttributesPrice }) => {
          const productPrice = +selectedAttributesPrice || price;
          return acc + productPrice * numberInCart;
        },
        0
      )
    );
  }, [cartProducts]);

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Кошик", path: "/cart" },
  ];

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Кошик</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        {cartProducts.length ? (
          <>
            <div className={s.products__container}>
              <div className={s.products__header}>
                <span>Товар</span>
                <span>Ціна</span>
                <span>Кількість</span>
                <span>Загальна сума</span>
                <span>Видалити</span>
              </div>
              {cartProducts.map((product, i) => (
                <CartProduct {...{ product }} key={product._id} />
              ))}
            </div>
            <div className={s.actions__container}>
              <h2 className={s.actions__price}>{`${fullPrice || 0} ₴`}</h2>
              <div>
                <Button
                  title="Купити"
                  onClick={onSubmit}
                  size="xl"
                  isUppercase
                />
              </div>
            </div>
          </>
        ) : (
          <div className={s.empty__cart__msg__container}>
            <h1 className={s.empty__cart__msg}>Поки що ваш кошик порожній</h1>
            <div className={s.catalog__btn}>
              <GoCatalogBtn />
            </div>
          </div>
        )}
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.all,
    fullPrice: state.cart.fullPrice,
    user: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
    showAlert: (content, type, timeout = 5000) =>
      dispatch(showAlertAction(content, type, timeout)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
