import React from "react";
import s from "./Input.module.css";
import classnames from "classnames";

const Input = ({
  Icon,
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  containerClass,
  inputClass,
  isError,
  children,
  isTextarea,
  ...rest
}) => {
  return (
    <div className={`${s.container} ${containerClass}`}>
      {!!label && <span className={s.label}>{label}</span>}
      <div className={s.container__input}>
        {!isTextarea ? (
          <input
            {...{ type }}
            {...{ value }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              [s.error__input]: isError,
            })}
            {...{ placeholder }}
            {...rest}
          />
        ) : (
          <textarea
            {...{ type }}
            {...{ value }}
            {...{ onChange }}
            className={classnames(s.input, inputClass, {
              [s.error__input]: isError,
            })}
            {...{ placeholder }}
            {...rest}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Input;
