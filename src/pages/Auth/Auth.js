import React, { useState } from "react";
import s from "./Auth.module.css";
import Input from "../../misc/Inputs/Input/Input";
import { Formik, ErrorMessage } from "formik";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import Button from "../../misc/Button/Button";
import { useHistory, Link } from "react-router-dom";
import _axios from "../../store/api/_axios";
import {
  loginAction,
  loginGoogleAction,
  loginFacebookAction,
} from "../../store/actions/profileActions";
import { connect } from "react-redux";
import {
  showAlertAction,
  hideAlertAction,
} from "../../store/actions/alertActions";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as CheckCircle } from "../../assets/check-circle.svg";
import { ReactComponent as ExclamationCircle } from "../../assets/exclamation-circle.svg";
import { ReactComponent as Home } from "../../assets/home.svg";

const Auth = ({
  login,
  hideAlert,
  showAlert,
  location,
  loginGoogle,
  loginFacebook,
}) => {
  const h = useHistory();
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Увійти", path: "/login" },
  ];

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", isRemember: false }}
        validate={(values) => {
          const errors = {};

          if (values.password.length <= 5) {
            errors.password = "Занадто короткий пароль";
          }
          if (!values.email) {
            errors.email = "Введіть електронну пошту";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Невірно введена електронна пошта";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;
          const userId = await login({ email, password }, values.isRemember);

          if (userId === "admin") {
            h.push("/admin");
          } else if (userId) {
            if (location?.state?.redirectTo) {
              h.push(location.state.redirectTo);
            } else {
              h.push(`/profile/${userId}`);
            }
          } else {
            showAlert("Помилка при авторизації. Невірно введені дані.");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
        }) => {
          const SuccessIcon = () => (
            <CheckCircle className={`${s.icon} ${s.success__icon}`} />
          );
          const ErrorIcon = () => (
            <ExclamationCircle className={`${s.icon} ${s.error__icon}`} />
          );
          return (
            <form>
              <div className={s.body}>
                <div className={s.container}>
                  <div className={s.title__container}>
                    <h4 className={s.title}>Увійти</h4>
                    <BreadCrumbs items={breadCrumbsItems} />
                  </div>
                  <div className={s.login}>
                    <div className={s.input__container}>
                      <div className={s.email}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="email"
                          value={values.email}
                          type="email"
                          placeholder="example@gmail.com"
                        >
                          {!errors.email && touched.email && !!values.email && (
                            <SuccessIcon />
                          )}

                          {(errors.email || !values.email) && touched.email && (
                            <ErrorIcon />
                          )}
                        </Input>
                        <div className={s.password}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            name="password"
                            value={values.password}
                            placeholder="••••••••"
                          >
                            {(errors.email || !values.email) &&
                              touched.email && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.remember__container}>
                          <input
                            type="checkbox"
                            checked={values.isRemember}
                            className={s.remember__checkbox}
                            name="isRemember"
                            onChange={handleChange}
                          />
                          <p
                            onClick={() =>
                              setValues({
                                ...values,
                                isRemember: !values.isRemember,
                              })
                            }
                            className={s.remember__desc}
                          >
                            Запам'ятати мене
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to="/restore">
                      <button className={s.restore} type="button">
                        Відновити акаунт
                      </button>
                    </Link>
                    <div className={s.submit_button}>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        title="Підтвердити"
                      />
                    </div>
                    <div className={s.fbt}>
                      <Link to="/register">
                        <button className={s.reg}>Зареєструватись</button>
                      </Link>
                      <GoBackBtn />
                    </div>
                    <div className={s.logwith}>
                      <Google className={`${s.logicon} ${s.gl}`} />
                      <Facebook className={`${s.logicon} ${s.fb} `} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, isRemember) => dispatch(loginAction(data, isRemember)),
    loginGoogle: () => dispatch(loginGoogleAction()),
    loginFacebook: () => dispatch(loginFacebookAction()),
    showAlert: (content) => dispatch(showAlertAction(content)),
    hideAlert: () => dispatch(hideAlertAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
