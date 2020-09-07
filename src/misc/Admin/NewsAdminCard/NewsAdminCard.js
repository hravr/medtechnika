import React, { useState } from "react";
import s from "./NewsAdminCard.module.css";
import Button from "../../Button/Button";
import _axios from "../../../store/api/_axios";
import { Link } from "react-router-dom";

const NewsAdminCard = ({ newsItem, showModal }) => {
  const { title, desc, bodyText, _id, createdAt } = newsItem;

  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <p className={s.card__title}>{title.substr(0, 10)}</p>
        <p className={s.card__subtitle}>{desc.substr(0, 20)}...</p>
        <div className={s.table__container}>
          <div className={s.createdAt}>
            {/* <Moment format="DD/MM/YYYY">{createdAt}</Moment> */}
          </div>
          <div className={s.buttons}>
            <Link to={`/admin/edit-news/${_id}`}>
              <Button className={s.edit__btn} size="sm" title="Редагувати" />
            </Link>
            <div className={s.delete__container}>
              <Button
                size="sm"
                title="Видалити"
                className={s.delete__btn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAdminCard;
