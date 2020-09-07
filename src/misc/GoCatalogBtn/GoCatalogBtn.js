import React from "react";
import s from "./GoCatalogBtn.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { ReactComponent as StoreAlt } from "../../assets/store-alt.svg";

const GoCatalogBtn = (props) => {
  return (
    <div className={s.body}>
      <Link to="/catalog" className={s.catalog__btn__container}>
        <Button title="Перейти до покупок" className={s.catalog__btn} size="md">
          <StoreAlt className={s.catalog__btn__icon} />
        </Button>
      </Link>
    </div>
  );
};

export default GoCatalogBtn;
