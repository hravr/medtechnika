import React from "react";
import { useHistory } from "react-router-dom";
import s from "./error.module.css";
import { ReactComponent as SignOutAlt } from "../../assets/sign-out-alt.svg";

function NoMatchPage() {
  const h = useHistory();
  return (
    <div className={s.body}>
      <div className={s.errorTitle}>
        <p>Page not found</p>
      </div>
      <div className={s.button}>
        <button
          onClick={() => {
            h.goBack();
          }}
          className={s.goBack}
        >
          <SignOutAlt className={s.goBack__icon} /> Go Back
        </button>
      </div>
    </div>
  );
}
export default NoMatchPage;
