import React from "react";
import s from "./ProfileModal.module.css";
import { connect } from "react-redux";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const ProfileModal = ({ isVisible, hide, user }) => {
  const { email, phone, fName, lName, _id } = user;
  return isVisible ? (
    <div className={s.modal__container}>
      <Link to="/profile" onClick={hide}>
        <div className={s.modal__header}>
          <img
            src={require("../../assets/profile.png")}
            alt="loading"
            className={s.modal__img}
          />
          <h3 className={s.modal__header__title}>{`${fName} ${lName}`}</h3>
        </div>
      </Link>
      <div className={s.modal__footer}>
        <div className={s.modal__footer__section}>
          <span className={s.modal__footer__label}>Номер телефону</span>
          <p className={s.modal__footer__value}>{phone}</p>
        </div>
        <div className={s.modal__footer__section}>
          <span className={s.modal__footer__label}>E-mail</span>
          <p className={s.modal__footer__value}>{email}</p>
        </div>
        <button className={s.logout__button}>Вийти з акаунту</button>
      </div>
    </div>
  ) : (
    <div />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
