import React, { useState, useEffect } from "react";
import s from "./OrderCardProfile.module.css";
import { ReactComponent as AngleDown } from "../../assets/angle-down.svg";
import { ReactComponent as AngleUp } from "../../assets/angle-up.svg";
import OrderProductCard from "../OrderProductCard/OrderProductCard";

const OrderCardProfile = ({ order, products, onExpanding }) => {
  const { createdAt, paymentType, delivery, sum } = order;
  const [isExpanded, setExpanded] = useState(false);

  const switchExpanding = () => setExpanded((prev) => !prev);

  useEffect(() => {
    if (isExpanded && onExpanding) {
      onExpanding();
    }
  }, [isExpanded]);

  return (
    <div className={s.card}>
      <div className={s.card__main}>
        <div className={s.card__section}>
          <span className={s.section__value}>{createdAt.split("T")[0]}</span>
        </div>
        <div className={s.card__section}>
          <span className={s.section__value}>
            {paymentType === "cash" ? "Готівкою" : "Карткою"}
          </span>
        </div>
        <div className={s.card__section}>
          <span className={s.section__value}>
            {delivery === "self-pickup" ? "Самовивіз" : "Нова Пошта"}
          </span>
        </div>
        <div className={s.card__section}>
          <span className={s.section__value}>{sum}</span>
        </div>
        <div className={s.card__section}>
          {!isExpanded ? (
            <AngleDown onClick={switchExpanding} className={s.arrow} />
          ) : (
            <AngleUp onClick={switchExpanding} className={s.arrow} />
          )}
        </div>
      </div>
      {isExpanded &&
        products &&
        products.map((product) => (
          <OrderProductCard key={product._id} {...{ product }} />
        ))}
      {!products && isExpanded && <h4>Зачекайте</h4>}
    </div>
  );
};

export default OrderCardProfile;
