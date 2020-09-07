import React, { useState, useRef, useEffect, useMemo } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import s from "./Profile.module.css";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import ProfileInput from "../../misc/Inputs/ProfileInput/ProfileInput";
import { useHistory, useParams } from "react-router-dom";
import _axios from "../../store/api/_axios";
import { connect } from "react-redux";
import userPhotoIcon from "../../assets/profile.webp";
import {
  getUserByIdAction,
  patchUserAction,
  logoutAction,
  getUserHistoryAction,
  getUserOrderProductsAction,
  uploadAvatarAction,
} from "../../store/actions/profileActions";
import { showAlertAction } from "../../store/actions/alertActions";
import { showModalAction } from "../../store/actions/baseActions";
import { Formik } from "formik";
import OrderCardProfile from "../../misc/OrderCardProfile/OrderCardProfile";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-alt-regular.svg";
import { ReactComponent as CashIcon } from "../../assets/money-bill.svg";
import { ReactComponent as CoinIcon } from "../../assets/coins.svg";
import { ReactComponent as CarIcon } from "../../assets/truck-solid.svg";
import { ReactComponent as DotsIcon } from "../../assets/ellipsis.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as SignOutAlt } from "../../assets/sign-out-alt.svg";
import { ReactComponent as PencilAlt } from "../../assets/pencil-alt.svg";
import { ReactComponent as AddressCard } from "../../assets/address-card.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as City } from "../../assets/city-solid.svg";
import { ReactComponent as StreetView } from "../../assets/street-view-solid.svg";
import { ReactComponent as Building } from "../../assets/building-regular.svg";
import { ReactComponent as Mail } from "../../assets/mail-bulk-solid.svg";
import { ReactComponent as HouseUser } from "../../assets/house-user-solid.svg";
import { ReactComponent as Phone } from "../../assets/phone.svg";
import { ReactComponent as Envelope } from "../../assets/envelope-solid.svg";

const Profile = ({
  user,
  patchUser,
  isLoading,
  showModal,
  logout,
  getUserHistory,
  getOrdersProducts,
  uploadAvatar,
  ordersProducts,
  orders,
}) => {
  const { id } = useParams();
  const h = useHistory();
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Профіль", path: "/profile" },
  ];

  const token = useMemo(() => {
    if (document.cookie?.includes("token")) {
      return document.cookie
        ?.split("; ")
        .filter((value) => value.startsWith("token"))[0]
        .split("=")[1];
    }
    return null;
  }, [document.cookie]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [userData, setUserData] = useState({ ...user });

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (event) => {
        const img = event.target.result;
        current.src = img;
        const formData = new FormData();
        formData.append("gallery", file);
        uploadAvatar(formData);
        setUserData((prev) => ({ ...prev, gallery: img }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    const submitData = { ...userData };
    if (submitData.phone && !Number.isNaN(submitData.phone)) {
      if (submitData.phone?.startsWith("0")) {
        submitData.phone = +`38${submitData.phone}`;
      } else {
        submitData.phone = +submitData.phone;
      }
    }
    patchUser(submitData, token);
  };

  const showLogoutModal = () => {
    showModal("Ви дійсно хочете вийти зі свого акаунту?", () => {
      logout();
      h.push("/login");
    });
  };

  const handleRemovePhoto = (e) => {
    setUserData((prev) => ({ ...prev, gallery: [] }));
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const onOrderCardExpand = (order) => {
    if (!ordersProducts[order._id]) {
      getOrdersProducts(order);
    }
  };

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    if (id) {
      getUserHistory(id);
    }
  }, [id]);

  return !isLoading || user._id ? (
    <div className={s.body}>
      <div className={s.container}>
        <div className={s.title__container}>
          <h3 className={s.title}>Мій профіль</h3>
          <BreadCrumbs items={breadCrumbsItems} />
        </div>
        <div>
          <Tabs>
            <TabList className={s.tabs}>
              {["Ваші дані", "Ваша адреса", "Історія Замовлень"].map(
                (item, i) => (
                  <Tab
                    onClick={() => setActiveTabIndex(i)}
                    key={item}
                    className={
                      activeTabIndex === i ? `${s.tab} ${s.tab__active}` : s.tab
                    }
                  >
                    {item}
                  </Tab>
                )
              )}
            </TabList>
            <TabPanel>
              <div className={`${s.profile} container cont__margin`}>
                <div className={s.profile__main}>
                  <div className={s.profile__info}>
                    <div className={s.profile__info__fields}>
                      <div className={s.profile__info__title}>
                        <div className={s.image_upload}>
                          <input
                            placeholder="+"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={imageUploader}
                          />
                          {!!userData.gallery?.length && (
                            <button
                              className={s.delete__photo}
                              onClick={handleRemovePhoto}
                              title="Видалити фотографію"
                            >
                              x
                            </button>
                          )}

                          <div
                            style={{
                              height: "100px",
                              width: "100px",
                            }}
                            onClick={() => imageUploader.current.click()}
                          >
                            <img
                              ref={uploadedImage}
                              src={
                                userData.gallery?.length
                                  ? userData.gallery
                                  : userPhotoIcon
                              }
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50px",
                              }}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className={s.container_title}>
                          <h4>Персональні дані</h4>
                        </div>
                        <SignOutAlt
                          onClick={showLogoutModal}
                          className={s.profile__info__icon}
                        />
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Ім'я"
                          val="firstName"
                          name="fName"
                          value={userData.fName}
                          placeholder="John"
                          onChange={onInputChange}
                        >
                          <User className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Прізвище"
                          val="lName"
                          placeholder="Smith"
                          name="lName"
                          value={userData.lName}
                          onChange={onInputChange}
                        >
                          <User className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="По-батькові"
                          val="fatherName"
                          placeholder="JohnDoevich"
                          value={userData.fatherName}
                          name="fatherName"
                          onChange={onInputChange}
                        >
                          <AddressCard
                            className={`${s.icon} ${s.input__icon}`}
                          />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Номер телефону"
                          val="phone"
                          placeholder="+380991234567"
                          type="tel"
                          value={userData.phone}
                          name="phone"
                          onChange={onInputChange}
                        >
                          <Phone className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          val="Електронна адреса"
                          label="E-mail"
                          placeholder="johndoe@gmail.com"
                          name="email"
                          value={userData.email}
                          onChange={onInputChange}
                        >
                          <Envelope className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>

                      <button
                        className={s.save__profile__btn}
                        onClick={handleSubmit}
                      >
                        Змінити
                        <span className={s.profile__btn__overlay}>
                          <PencilAlt
                            className={s.profile__btn__overlay__icon}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={`${s.profile} container cont__margin`}>
                <div className={s.profile__main}>
                  <div className={s.profile__info}>
                    <div className={s.profile__info__fields}>
                      <div className={s.profile__info__title}>
                        <div
                          style={{
                            height: "100px",
                            width: "100px",
                          }}
                        >
                          <img
                            ref={uploadedImage}
                            src={
                              userData.gallery?.length
                                ? userData.gallery
                                : userPhotoIcon
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50px",
                            }}
                            alt=""
                          />
                        </div>
                        <h4 className={s.container_title}>Ваша адреса</h4>
                        <SignOutAlt
                          onClick={showLogoutModal}
                          className={s.profile__info__icon}
                        />
                      </div>

                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Місто"
                          name="city"
                          placeholder="Тернопіль"
                          onChange={onInputChange}
                        >
                          <City className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Вулиця"
                          name="street"
                          placeholder="Руська"
                          onChange={onInputChange}
                        >
                          <StreetView
                            className={`${s.icon} ${s.input__icon}`}
                          />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Будинок"
                          name="house"
                          placeholder="12"
                          onChange={onInputChange}
                        >
                          <HouseUser className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Квартира"
                          name="flat"
                          placeholder="81"
                          onChange={onInputChange}
                        >
                          <Building className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>
                      <div className={s.profile__info__field}>
                        <ProfileInput
                          label="Склад Нової пошти"
                          name="warehouse"
                          placeholder="1"
                          onChange={onInputChange}
                        >
                          <Mail className={`${s.icon} ${s.input__icon}`} />
                        </ProfileInput>
                      </div>

                      <button
                        className={s.save__profile__btn}
                        onClick={handleSubmit}
                      >
                        Змінити
                        <span className={s.profile__btn__overlay}>
                          <PencilAlt
                            className={s.profile__btn__overlay__icon}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={`${s.profile} container cont__margin`}>
                <div className={s.profile__main}>
                  <div className={s.profile__info}>
                    <div
                      className={`${s.profile__info__fields} ${s.order__content}`}
                    >
                      <div className={s.profile__info__title}>
                        <div
                          style={{
                            height: "100px",
                            width: "100px",
                          }}
                        >
                          <img
                            ref={uploadedImage}
                            src={
                              userData.gallery?.length
                                ? userData.gallery
                                : userPhotoIcon
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50px",
                            }}
                            alt=""
                          />
                        </div>
                        <h4 className={s.container_title}>Ваша історія</h4>
                        <SignOutAlt
                          onClick={showLogoutModal}
                          className={s.profile__info__icon}
                        />
                      </div>
                      <div className={s.orders}>
                        <div className={s.orders__header}>
                          <span>
                            <CalendarIcon className={s.icon} />
                            Дата
                          </span>
                          <span>
                            <CashIcon className={s.icon} />
                            Оплата
                          </span>
                          <span>
                            <CarIcon className={s.icon} />
                            Доставка
                          </span>
                          <span>
                            <CoinIcon className={s.icon} />
                            Сума
                          </span>
                          <span>
                            <DotsIcon className={s.icon} />
                          </span>
                        </div>
                        {orders?.map((order) => (
                          <OrderCardProfile
                            onExpanding={() => onOrderCardExpand(order)}
                            {...{ order }}
                            products={ordersProducts[order._id]}
                            key={order._id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ) : (
    <div className={s.body}>
      <div className={s.container} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile,
    isLoading: state.base.isLoading,
    orders: state.profile.orders,
    ordersProducts: state.profile.ordersProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
    patchUser: (user, token) => dispatch(patchUserAction(user, token)),
    showAlert: (content) => dispatch(showAlertAction(content)),
    showModal: (content, onSubmit, onReject) =>
      dispatch(showModalAction(content, onSubmit, onReject)),
    logout: () => dispatch(logoutAction()),
    getUserHistory: (id) => dispatch(getUserHistoryAction(id)),
    getOrdersProducts: (order) => dispatch(getUserOrderProductsAction(order)),
    uploadAvatar: (avatar) => dispatch(uploadAvatarAction(avatar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
