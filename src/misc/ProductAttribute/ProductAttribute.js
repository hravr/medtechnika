import React, { useState, useEffect } from "react";
import s from "./ProductAttribute.module.css";
import uuid from "react-uuid";
import classnames from "classnames";

const ProductAttribute = ({
  name,
  values,
  selectAttribute = () => {},
  isClickable,
  attributeClasses = "",
}) => {
  const [activeAttribute, setActiveAttribute] = useState();
  const selectAttributeHandler = (value, i) => {
    selectAttribute(name, value);
    setActiveAttribute(i);
  };

  return (
    <div className={s.attribute__container} key={uuid()}>
      <span className={s.attribute__label}>{name}:</span>
      <div className={s.attribute__body}>
        {values.map((value, i) => (
          <span
            onClick={() => isClickable && selectAttributeHandler(value, i)}
            className={classnames(s.attribute, attributeClasses, {
              [s.active]: activeAttribute === i,
            })}
            key={i}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductAttribute;
