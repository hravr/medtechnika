import React from "react";
import s from "./BreadCrumbs.module.css";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ items }) => {
  return (
    <div className={s.container}>
      {items.map(({ name, path, icon }, i) => {
        const isLast = i + 1 === items.length;
        const text = isLast ? name : `${name} / `;
        const className = isLast ? s.last__crumb : s.crumb;
        return (
          <Link to={path} key={i} className={s.link}>
            {!!icon && icon}
            <span {...{ className }} key={i}>
              {text}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
