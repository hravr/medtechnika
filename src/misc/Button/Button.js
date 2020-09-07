import React from "react";
import s from "./Button.module.css";
import classnames from "classnames";

const Button = ({
  onClick,
  className,
  title,
  isRound,
  children,
  size = "md",
  isUppercase,
  isSecondary,
  isCapitalize,
  isDisabled,
  ...rest
}) => {
  const classes = classnames(s.button, className, {
    [s.button__round]: isRound,
    [s.uppercase]: isUppercase,
    [s.secondary]: isSecondary,
    [s.capitalize]: isCapitalize,
    [s.disabled]: isDisabled,
  });
  return (
    <button
      {...rest}
      {...{ onClick }}
      className={`${classes} ${s[`button__${size}`]}`}
    >
      {/* {!!icon && <FontAwesomeIcon className={s.icon} {...{ icon }} />} */}
      {children}
      {!!title && <span>{title}</span>}
    </button>
  );
};

export default Button;
