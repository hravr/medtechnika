import React from "react";
import s from "./Category.module.css";

const Category = ({ category, onSelect, children, ...rest }) => {
  return (
    <div className={s.container}>
      <span {...rest}>{category.title}</span>
      {children}
    </div>
  );
};

export default Category;
