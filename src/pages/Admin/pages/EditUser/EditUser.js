import React, { useRef, useEffect } from "react";
import s from "./EditUser.module.css";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../../../misc/Inputs/Input/Input";
import PhoneNumberInput from "../../../../misc/Inputs/PhoneNumberInput/PhoneNumberInput";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../../../misc/Button/Button";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import userDefaultAvatar from "../../../../assets/profile.png";
import { withFormik } from "formik";
import { getUsersAction } from "../../../../store/actions/adminActions";
import { connect } from "react-redux";
import { patchUserAction } from "../../../../store/actions/profileActions";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";

const EditUser = ({
  values,
  setValues,
  handleChange,
  errors,
  handleSubmit,
  handleBlur,
  touched,
  getUserById,
  editUser,
  getUsers,
  users,
}) => {
  const uploadedImage = useRef(null);
  const uploaderRef = useRef(null);

  const onAvatarClick = () => {
    uploaderRef.current.click();
  };

  const { id } = useParams();

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (event) => {
        const img = event.target.result;
        current.src = img;
      };
      reader.readAsDataURL(file);
    }
  };
  const h = useHistory();

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Редагувати користувача" },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users?.length) {
      const userToEdit = users.filter((user) => user._id === id)[0];
      if (userToEdit) {
        setValues({ ...values, ...userToEdit });
      }
    }
  }, [users]);

  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування користувача</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
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
                src={values.userAvatar || userDefaultAvatar}
                className={s.image}
                onClick={onAvatarClick}
                alt=""
              />
            </div>
          </div>
          <div className={s.user__info}>
            <Input
              value={values.fName}
              label="Ім'я"
              containerClass={s.input__container}
              onChange={handleChange}
              isError={errors.fName && touched.fName}
              name="fName"
              placeholder="Іван"
              onBlur={handleBlur}
            />
            <Input
              value={values.lName}
              label="Прізвище"
              containerClass={s.input__container}
              onChange={handleChange}
              isError={errors.lName && touched.lName}
              name="lName"
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
              value={values.deliveryCity}
              label="Місто"
              placeholder="Тернопіль"
              onChange={handleChange}
              containerClass={s.input__container}
              name="deliveryCity"
            />
            <Input
              value={values.deliveryStreet}
              label="Вулиця"
              placeholder="Руська"
              containerClass={s.input__container}
              onChange={handleChange}
              name="deliveryStreet"
            />
            <Input
              value={values.deliveryHouse}
              label="Будинок"
              placeholder="23"
              containerClass={s.input__container}
              onChange={handleChange}
              name="deliveryHouse"
            />
            <Input
              value={values.deliveryApartament}
              label="Квартира"
              placeholder="81"
              onChange={handleChange}
              containerClass={s.input__container}
              name="deliveryApartament"
            />
            <Input
              value={values.deliveryPostIndex}
              containerClass={s.input__container}
              label="Поштовий індекс"
              onChange={handleChange}
              placeholder="46000"
              name="deliveryPostIndex"
            />
            <Input
              value={values.deliveryWarehouse}
              label="Склад Нової пошти"
              placeholder="3"
              onChange={handleChange}
              containerClass={s.input__container}
              name="deliveryWarehouse"
            />
          </div>
          <div className={s.buttons}>
            <Button
              isDisabled={
                errors.fName ||
                errors.lName ||
                errors.fatherName ||
                errors.phone ||
                errors.email ||
                errors.password
              }
              type="submit"
              onClick={handleSubmit}
              className={s.edit__btn}
              size="lg"
              title="Змінити"
            />
          </div>
          <div className={s.back__container}>
            <GoBackBtn />
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    fName: "",
    lName: "",
    fatherName: "",
    phone: "",
    email: "",
    deliveryCity: "",
    deliveryStreet: "",
    deliveryHouse: "",
    deliveryApartament: "",
    deliveryWarehouse: "",
    password: "",
  }),
  validate: (values) => {
    const errors = {};
    if (!values.fName) {
      errors.name = "Required";
    }
    if (!values.lName) {
      errors.lName = "Required";
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
  },
  handleSubmit: (values, { props }) => {
    const { editUser } = props;
    let correctPhone = toString(values.phone).replace(/-/gi, "");
    correctPhone = correctPhone.replace("+", "");
    editUser({ ...values, phone: correctPhone });
  },
})(EditUser);

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersAction()),
    editUser: (user) => dispatch(patchUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
