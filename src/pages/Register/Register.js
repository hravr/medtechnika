import React, { useState } from "react";
import s from "./Register.module.css";
import Input from "../../misc/Inputs/Input/Input";
import Button from "../../misc/Button/Button";
import { Formik, ErrorMessage } from "formik";
import PhoneNumberInput from "../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import { useHistory, Link } from "react-router-dom";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import _axios from "../../store/api/_axios";
import { registerAction } from "../../store/actions/profileActions";
import { connect } from "react-redux";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as CheckCircle } from "../../assets/check-circle.svg";
import { ReactComponent as ExclamationCircle } from "../../assets/exclamation-circle.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as Check } from "../../assets/check.svg";

const Register = ({ register }) => {
  const [isRegister, setRegister] = useState(false);
  const setFormRegister = () => setRegister(true);
  const setFormLogin = () => setRegister(false);

  const [isAgree, setIsAgree] = useState(false);
  const agreeCheckbox = ({ target: { checked } }) => {
    setIsAgree(checked);
  };
  const h = useHistory();

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Реєстрація", path: "/register" },
  ];
  return (
    <div>
      <Formik
        initialValues={{
          fName: "",
          sName: "",
          fatherName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          phone: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fName || values.fName.length <= 1) {
            errors.fName = "Занадто коротке Ім'я";
          } else if (/[0-9._%+-]$/i.test(values.fName)) {
            errors.fName = "Невірно введенe Ім'я";
          }

          if (!values.lName || values.lName.length <= 2) {
            errors.lName = "Занадто коротке прізвище";
          } else if (/[0-9._%+-]$/i.test(values.lName)) {
            errors.lName = "Невірно введенe прізвище";
          }

          if (!values.phone || values.phone.length <= 10) {
            errors.phone = "Невірно введений номер";
          }

          if (values.fatherName.length <= 3) {
            errors.fatherName = "Занадто коротке по-батькові";
          } else if (/[0-9._%+-]$/i.test(values.fatherName)) {
            errors.fatherName = "Невірно введенe по-батькові";
          }

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

          if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = "ne spivpadae";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { fName, lName, fatherName, phone, password, email } = values;
          const correctPhone = phone.replace(/-/gi, "").replace("+", "");

          const id = await register({
            fName,
            lName,
            fatherName,
            phone: +correctPhone,
            password,
            email,
          });
          if (id) {
            h.push(`/profile/${id}`);
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
          handleFocus,
          isSubmiting,
          validateOnBlur,
        }) => {
          const SuccessIcon = () => (
            <CheckCircle className={`${s.icon} ${s.success__icon}`} />
          );
          const ErrorIcon = () => (
            <ExclamationCircle className={`${s.icon} ${s.error__icon}`} />
          );
          return (
            <form onSubmit={handleSubmit}>
              <div className={s.body}>
                <div className={s.container}>
                  <div className={s.title__container}>
                    <h3 className={s.title}>CREATE ACCOUNT</h3>
                    <BreadCrumbs items={breadCrumbsItems} />
                  </div>
                  <div className={s.register}>
                    <div className={s.input__container}>
                      <div className={s.form}>
                        <div className={s.login}>
                          <Input
                            placeholder="Ім'я"
                            name="fName"
                            value={values.fName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                          >
                            {!errors.fName &&
                              touched.fName &&
                              !!values.fName && <SuccessIcon />}

                            {(errors.fName || !values.fName) &&
                              touched.fName && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.login}>
                          <Input
                            placeholder="Прізвище"
                            name="lName"
                            value={values.lName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {!errors.lName &&
                              touched.lName &&
                              !!values.lName && <SuccessIcon />}

                            {(errors.lName || !values.lName) &&
                              touched.lName && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.login}>
                          <Input
                            name="fatherName"
                            placeholder="По-батькові"
                            value={values.fatherName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {!errors.fatherName &&
                              touched.fatherName &&
                              !!values.fatherName && <SuccessIcon />}

                            {(errors.fatherName || !values.fatherName) &&
                              touched.fatherName && <ErrorIcon />}
                          </Input>
                        </div>

                        <div className={s.ph__number}>
                          <PhoneNumberInput
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="phone"
                            value={values.phone}
                          >
                            {!errors.phone &&
                              touched.phone &&
                              !!values.phone && <SuccessIcon />}

                            {(errors.phone || !values.phone) &&
                              touched.phone && <ErrorIcon />}
                          </PhoneNumberInput>
                        </div>
                        <div className={s.email}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email}
                            type="email"
                            placeholder="example@gmail.com"
                          >
                            {!errors.email &&
                              touched.email &&
                              !!values.email && <SuccessIcon />}

                            {(errors.email || !values.email) &&
                              touched.email && <ErrorIcon />}
                          </Input>
                        </div>
                        <div className={s.pswd}>
                          <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            value={values.password}
                            type="password"
                            placeholder="Пароль"
                          >
                            {!errors.password &&
                              touched.password &&
                              !!values.password && <SuccessIcon />}

                            {(errors.password || !values.password) &&
                              touched.password && <ErrorIcon />}
                          </Input>
                        </div>
                      </div>
                      <div className={s.pswd}>
                        <Input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          type="password"
                          placeholder="Підтвердіть пароль"
                        >
                          {!errors.passwordConfirm &&
                            touched.passwordConfirm &&
                            !!values.passwordConfirm && <SuccessIcon />}

                          {(errors.passwordConfirm ||
                            !values.passwordConfirm) &&
                            touched.passwordConfirm && <ErrorIcon />}
                        </Input>
                      </div>
                      <div className={s.check_box}>
                        <input
                          icon={Check}
                          className={s.faCheck}
                          type="checkbox"
                          name="chexbox"
                          onChange={agreeCheckbox}
                          chacked={isAgree}
                        />
                        <Link to="/politics">
                          <p className={s.politics}>
                            Погоджуюся з політикою кофіденційності
                          </p>
                        </Link>
                      </div>
                      <div className={s.submit_button}>
                        <Button
                          title="Зареєструватися"
                          disabled={!isAgree}
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                    <div className={s.fbt}>
                      <div>
                        <Link to="/login">
                          <button className={s.go__login}>Увійти</button>
                        </Link>
                      </div>
                      <button
                        className={s.goback}
                        onClick={() => {
                          h.goBack();
                        }}
                      >
                        <ArrowLeft className={s.faArrowLeft} />
                        Продовжити покупки
                      </button>
                      <div className={s.logwith}>
                        <Google className={`${s.logicon} ${s.gl}`} />
                        <Facebook className={`${s.logicon} ${s.fb} `} />
                      </div>
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
    register: (data) => dispatch(registerAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
