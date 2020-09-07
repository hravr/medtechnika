import React from "react";
import s from "./OrderCard.module.css";

const OrderCard = ({
  orderNumber,
  createDate,
  status,
  paymentType,
  delivery,
  orderSum,
}) => {
  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <span>{orderNumber}</span>
        <span>{createDate}</span>
        <span className={s.status}>{status}</span>
        <span className={s.pay}>{paymentType}</span>
        <span className={s.delivery}>{delivery}</span>
        <span>{orderSum}</span>
      </div>
    </div>
  );
};

export default OrderCard;
