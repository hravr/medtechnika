import React, { useState } from "react";
import s from "./RestorePassord.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory, Link } from "react-router-dom";
import _axios from "../../store/api/_axios";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";

const RestorePassord = () => {
  const h = useHistory();
  const [email, setEmail] = useState();
  const handleSubmit = () => {
    _axios
      .post("/restore/password", { email })
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title__container}>
            <h4 className={s.title}>ACCOUNT</h4>
          </div>
          <div className={s.login}>
            <h5>Відновлення паролю</h5>
            <h6>Ми відправимо повідомлення на вашу електронну адресу</h6>
            <div className={s.input__container}>
              <div className={s.email}>
                <Input
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className={s.submit_button}>
              <Link to="/new-password">
                <Button title="Sign in" onClick={handleSubmit} />
              </Link>
            </div>
            <GoBackBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default RestorePassord;
