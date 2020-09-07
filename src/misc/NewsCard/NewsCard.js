import React from "react";
import s from "./NewsCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const NewsCard = ({ newsItem }) => {
  const { title, desc, bodyText, gallery, _id, createdAt } = newsItem;
  return (
    <Link to={`/single-news/${_id}`} className={s.card__link}>
      <div className={s.card}>
        <h2 className={s.card__title}>{title}</h2>
        <img
          src={gallery || require("../../assets/image-placeholder.webp")}
          alt="loading"
          className={s.card__img}
        />
        <p className={s.card__subtitle}>{desc.substr(0, 100)}...</p>
        <div className={s.createdAt}>
          {new Date(createdAt).toISOString().split("T")[0]}
        </div>
        <div>
          <Button size="lg" title="Читати більше" />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
