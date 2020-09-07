import React, { useRef, useState } from "react";
import s from "./CreateUser.module.css";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../../../misc/Inputs/Input/Input";
import PhoneNumberInput from "../../../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import Button from "../../../../misc/Button/Button";
import { Formik } from "formik";
import userDefaultAvatar from "../../../../assets/profile.png";
import { registerAction } from "../../../../store/actions/profileActions";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import { showAlertAction } from "../../../../store/actions/alertActions";

const CreateUser = ({ register, showAlert }) => {
  const uploaderRef = useRef();
  const [userAvatar, setUserAvatar] = useState();

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Створити користувача" },
  ];

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = event.target.result;
        setUserAvatar(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const onAvatarClick = () => {
    uploaderRef.current.click();
  };

  const h = useHistory();
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Створення користувача</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            fatherName: "",
            phone: "",
            email: "",
            city: "",
            street: "",
            house: "",
            flat: "",
            postIndex: "",
            warehouse: "",
            password: "",
          }}
          onSubmit={async (values) => {
            let correctPhone = values.phone.replace(/-/gi, "");
            correctPhone = correctPhone.replace("+", "");
            register({
              ...values,
              phone: correctPhone,
              fName: values.name,
              lName: values.surname,
            });
            let isSuccess = false;
            isSuccess = await register({
              ...values,
              phone: correctPhone,
              fName: values.name,
              lName: values.surname,
            });
            if (isSuccess) {
              showAlert("Продавця змінено успішно!", "success");
            } else {
              showAlert("Сталась помилка!", "error");
            }
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.surname) {
              errors.surname = "Required";
            }
            if (!values.fatherName) {
              errors.fatherName = "Required";
            }
            if (!values.phone) {
              errors.phone = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            }
            if (values.password.length < 6) {
              errors.password = "Password length";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
          }) => {
            return (
              <div className={s.body}>
                <div className={s.image_upload}>
                  <input
                    placeholder="+"
                    ref={uploaderRef}
                    type="file"
                    className={s.hidden}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className={s.image__container}>
                    <img
                      src={userAvatar || userDefaultAvatar}
                      className={s.image}
                      onClick={onAvatarClick}
                      alt=""
                    />
                  </div>
                </div>
                <div className={s.user__info}>
                  <Input
                    value={values.name}
                    label="Ім'я"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    isError={errors.name && touched.name}
                    name="name"
                    placeholder="Іван"
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.surname}
                    label="Прізвище"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    isError={errors.surname && touched.surname}
                    name="surname"
                    placeholder="Іванов"
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.fatherName}
                    label="По-батькові"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    isError={errors.fatherName && touched.fatherName}
                    name="fatherName"
                    placeholder="Іванович"
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.email}
                    containerClass={s.input__container}
                    label="Електронна адреса"
                    onChange={handleChange}
                    isError={errors.email && touched.email}
                    name="email"
                    placeholder="ivan19@gmail.com"
                    onBlur={handleBlur}
                  />
                  <PhoneNumberInput
                    value={values.phone}
                    containerClass={s.input__container}
                    isError={errors.phone && touched.phone}
                    label="Номер телефону"
                    onChange={handleChange}
                    name="phone"
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.password}
                    label="Пароль"
                    placeholder="12345678"
                    isError={errors.password && touched.password}
                    name="password"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={s.address__info}>
                  <Input
                    value={values.city}
                    label="Місто"
                    placeholder="Тернопіль"
                    onChange={handleChange}
                    containerClass={s.input__container}
                    name="city"
                  />
                  <Input
                    value={values.street}
                    label="Вулиця"
                    placeholder="Руська"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    name="street"
                  />
                  <Input
                    value={values.house}
                    label="Будинок"
                    placeholder="23"
                    containerClass={s.input__container}
                    onChange={handleChange}
                    name="house"
                  />
                  <Input
                    value={values.flat}
                    label="Квартира"
                    placeholder="81"
                    onChange={handleChange}
                    containerClass={s.input__container}
                    name="flat"
                  />
                  <Input
                    value={values.postIndex}
                    containerClass={s.input__container}
                    label="Поштовий індекс"
                    onChange={handleChange}
                    placeholder="46000"
                    name="postIndex"
                  />
                  <Input
                    value={values.warehouse}
                    label="Склад Нової пошти"
                    placeholder="3"
                    onChange={handleChange}
                    containerClass={s.input__container}
                    name="warehouse"
                  />
                </div>
                <div className={s.buttons}>
                  <Button
                    isDisabled={
                      errors.name ||
                      errors.surname ||
                      errors.fatherName ||
                      errors.phone ||
                      errors.email ||
                      errors.password
                    }
                    type="submit"
                    onClick={handleSubmit}
                    className={s.edit__btn}
                    size="lg"
                    title="Створити"
                  />
                  <GoBackBtn />
                </div>
              </div>
            );
          }}
        </Formik>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(registerAction(user)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
