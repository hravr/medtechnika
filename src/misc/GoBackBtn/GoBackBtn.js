import React from "react";
import s from "./GoBackBtn.module.css";
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";

const GoBackBtn = (props) => {
  const h = useHistory();
  return (
    <div>
      <button
        className={s.goBack__but}
        onClick={() => {
          h.goBack();
        }}
      >
        <ArrowLeft className={s.goBack} />
        Повернутися
      </button>
    </div>
  );
};

export default GoBackBtn;
