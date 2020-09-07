import React from "react";
import s from "./ProductCardAdmin.module.css";

const ProductCard = ({ getCategories, categories }) => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <span>Номер замовлення</span>
        <span>Дата створення</span>
        <span>Статус</span>
        <span>Спосіб оплати</span>
        <span>Спосіб доставки</span>
        <span>Загальна сума</span>
      </div>
    </div>
  );
};

export default ProductCard;
