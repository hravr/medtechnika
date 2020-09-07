import React from "react";
import s from "./Stars.module.css";
import { ReactComponent as StarSolid } from "../../assets/star-solid.svg";
import { ReactComponent as StarRegular } from "../../assets/star-regular.svg";
import classnames from "classnames";

const Stars = ({
  containerClass,
  value,
  isStatic = true,
  setValue,
  size = "md",
}) => {
  return (
    <div className={`${s.container} ${containerClass}`}>
      {[1, 2, 3, 4, 5].map((item, i) => {
        const isActive = item <= value;

        return isActive ? (
          <StarSolid
            className={classnames(s.star__icon, {
              [s.md]: size === "md",
              [s.sm]: size === "sm",
              [s.lg]: size === "lg",
            })}
            onClick={!isStatic ? () => setValue(item) : () => {}}
          />
        ) : (
          <StarRegular
            onClick={!isStatic ? () => setValue(item) : () => {}}
            className={classnames(s.star__icon, {
              [s.md]: size === "md",
              [s.sm]: size === "sm",
              [s.lg]: size === "lg",
            })}
          />
        );
      })}
    </div>
  );
};

export default Stars;
