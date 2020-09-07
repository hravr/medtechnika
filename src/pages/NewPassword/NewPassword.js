import React, { useState } from "react";
import s from "./NewPassword.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import _axios from "../../store/api/_axios";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";

const RestorePassord = () => {
  const h = useHistory();
  const [password, setPassword] = useState();
  const handleSubmit = () => {
    _axios
      .post("/change/password", { password })
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
            <h4 className={s.title}>Відновлення паролю</h4>
          </div>
          <div className={s.login}>
            <h5>Відновлення паролю</h5>
            <h6>Введіть ваш новий пароль</h6>
            <div className={s.input__container}>
              <div className={s.password}>
                <Input
                  placeholder="••••••••"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={s.password}>
                <Input
                  placeholder="••••••••"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={s.submit_button}>
              <Button title="Змінити пароль" onClick={handleSubmit} />
            </div>
            <GoBackBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default RestorePassord;
