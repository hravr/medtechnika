import React from "react";
import s from "./Modal.module.css";
import Button from "../Button/Button";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  showModalAction,
  hideModalAction,
} from "../../store/actions/baseActions";

const Modal = ({
  hide,
  content,
  isVisible,
  onSubmit = () => {},
  onReject = () => {},
}) => {
  const submitHandler = () => {
    onSubmit();
    hide();
  };

  const rejectHandler = () => {
    onReject();
    hide();
  };

  return (
    <div className={classnames(s.modal__container, { [s.hide]: !isVisible })}>
      <div className={classnames(s.modal, { [s.hide]: !isVisible })}>
        {/* <button onClick={closeModal} className={s.x}>
          X
        </button> */}
        <h2 className={s.title}>{content}</h2>
        <div className={s.buttons}>
          <Button title="Так" className={s.plus} onClick={submitHandler} />
          <Button title="Ні" className={s.minus} onClick={rejectHandler} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    content: state.base.modalContent,
    isVisible: state.base.isModalVisible,
    onSubmit: state.base.onModalSubmit,
    onReject: state.base.onModalReject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hideModalAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
