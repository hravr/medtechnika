import React, { useState } from "react";
import s from "./UserCard.module.css";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import { Link } from "react-router-dom";
import _axios from "../../../store/api/_axios";

const UserCard = () => {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <div className={s.card}>
      <div className={s.card__atrbutes}>
        <span className={s.fname}>Хасан</span>
        <span className={s.lname}>Підр</span>
        <span className={s.mail}>agrinkiv74@gmail.com</span>
        <span className={s.phone__number}>+380686358298</span>
        <div className={s.delivery}>
          <span>11</span>
          <div className={s.buttons}>
            <Link to="/admin/edit-user">
              <Button className={s.edit__btn} size="sm" title="Редагувати" />
            </Link>
            <div className={s.delete__container}>
              <Button
                size="sm"
                title="Видалити"
                className={s.delete__btn}
                onClick={openModal}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <Modal closeModal={closeModal} show={show} />}
    </div>
  );
};

export default UserCard;
