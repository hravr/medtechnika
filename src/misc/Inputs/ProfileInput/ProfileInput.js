import React, { useState } from "react";
import s from "./ProfileInput.module.css";

const Input = ({
  type,
  label,
  defaultValue,
  value,
  onFocus = () => {},
  onBlur = () => {},
  style = {},
  inputStyle = {},
  onChange = () => {},
  placeholder,
  children,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  const focusHandler = () => {
    setFocused(true);
    onFocus();
  };
  const blurHandler = () => {
    setFocused(false);
    onBlur();
  };
  return !children ? (
    <div className={s.input__container}>
      <p className={s.label}>{label}</p>
      <input
        {...{ style }}
        type={type || "text"}
        className={s.input}
        onFocus={focusHandler}
        onBlur={blurHandler}
        {...{ onChange }}
        {...{ defaultValue }}
        {...{ value }}
        {...rest}
        {...{ placeholder }}
      />
    </div>
  ) : (
    <div className={s.input__container}>
      <p className={s.label}>{label}</p>
      <div className={s.custom_input} style={inputStyle}>
        <div className={s.input__icon__container}>{children}</div>
        <input
          {...{ style }}
          type={type || "text"}
          alt="loading"
          {...{ placeholder }}
          onFocus={focusHandler}
          onBlur={blurHandler}
          {...{ onChange }}
          {...{ value }}
          className={`${s.input} ${s.input_with_icon}`}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
