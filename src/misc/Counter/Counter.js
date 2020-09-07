import React, { useState, useEffect } from "react";
import s from "./Counter.module.css";
import InputMask from "react-input-mask";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";

const Counter = ({ onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const onInputChange = ({ target }) => setValue(target.value);

  const onPlusClick = () => setValue((prev) => +prev + 1);
  const onMinusClick = () =>
    setValue((prev) => (prev - 1 > 0 ? prev - 1 : prev));

  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <div className={s.container}>
      <div onClick={onMinusClick} className={s.sign__icon__container}>
        <Minus className={s.icon} />
      </div>
      <InputMask
        maskChar=""
        mask="9999"
        {...{ value }}
        onChange={onInputChange}
      >
        {(rest) => <input {...rest} className={s.input} disableUnderline />}
      </InputMask>
      <div onClick={onPlusClick} className={s.sign__icon__container}>
        <Plus className={s.icon} />
      </div>
    </div>
  );
};

export default Counter;
