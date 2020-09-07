import React, { useState, useEffect } from "react";
import s from "./Admin.module.css";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import OrderCard from "../../misc/Admin/OrderCard/OrderCard";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../misc/Button/Button";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import Input from "../../misc/Inputs/Input/Input";
import { Formik } from "formik";
import Select from "../../misc/Select/Select";
import AdminRow from "../../misc/Admin/AdminRow/AdminRow";
import {
  getProducts,
  getCategoriesAction,
} from "../../store/actions/productsActions";
import {
  createCategoryAction,
  getVendorsAction,
  createVendorAction,
  getAttributesAction,
  deleteAttributeAction,
  deleteCategoryAction,
  getUsersAction,
  createAttributeAction,
  editAttributeAction,
  deleteNewsAction,
  editVendorAction,
  deleteVendorAction,
  deleteUserAction,
  getOrdersAction,
  getOrderProductsAction,
  deleteOrderAction,
} from "../../store/actions/adminActions";
import { logoutAction } from "../../store/actions/profileActions";
import { getAllNewsAction } from "../../store/actions/newsActions";
import { showAlertAction } from "../../store/actions/alertActions";
import { showModalAction } from "../../store/actions/baseActions";
import ReactPaginate from "react-paginate";
import ProductsView from "../../misc/Admin/ProductsView/ProductsView";
import {
  getContactMessagesAction,
  readMessageAction,
  deleteMessageAction,
} from "../../store/actions/contactFormActions";
import classnames from "classnames";
import { ReactComponent as SignOutAlt } from "../../assets/sign-out-alt.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Minus } from "../../assets/minus.svg";

const Admin = ({
  isLoading,
  showAlert,
  showModal,
  logout,
  allNews,
  allProducts,
  ordersProducts,
  categories,
  contactMessages,
  attributes,
  users,
  vendors,
  orders,
  getCategories,
  getVendors,
  getAttributes,
  getUsers,
  getNews,
  getOrders,
  getContactMessages,
  getOrderProducts,
  createCategory,
  createVendor,
  createAttribute,
  deleteAttribute,
  deleteCategory,
  deleteNews,
  deleteVendor,
  deleteUser,
  deleteMessage,
  deleteOrder,
  editAttribute,
  editVendor,
  readMessage,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editing, setEditing] = useState({
    attribute: { _id: null, name: "" },
    category: { _id: null },
    vendor: { _id: null },
  });
  const [expandedMessagesIds, setExpandedMessagesIds] = useState([]);

  const expandMessageHandler = (message) => {
    const { _id } = message;
    if (expandedMessagesIds.includes(_id)) {
      setExpandedMessagesIds(
        expandedMessagesIds.filter((msgId) => msgId !== _id)
      );
    } else {
      setExpandedMessagesIds((prev) => [...prev, _id]);
    }
    if (!message.read) {
      readMessage(message);
    }
  };

  const editingHandler = (type, setValues, body, value) => {
    setEditing((prev) => ({ ...prev, [type]: body }));
    setValues(value);
  };

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Адмін", path: "/admin" },
  ];

  const h = useHistory();
  const showLogoutModal = () => {
    showModal("Ви дійсно хочете вийти зі свого акаунту?", logout);
  };
  useEffect(() => {
    (async () => {
      await getCategories();
      await getAttributes();
      await getVendors();
      await getUsers();
      await getNews();
      await getContactMessages();
      await getOrders();
    })();
  }, []);

  const isVendorEditing = !!editing.vendor._id;
  const isAttributeEditing = !!editing.attribute._id;
  const isCategoryEditing = !!editing.category._id;

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h4 className={s.title}>Адмін</h4>

        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <Tabs>
          <TabList className={s.tabs}>
            {[
              "Замовлення",
              "Товари",
              "Категорії",
              "Атрибути",
              "Продавці",
              "Користувачі",
              "Новини",
              "Контактна форма",
            ].map((item, i) => (
              <Tab
                onClick={() => setActiveTabIndex(i)}
                key={item}
                className={classnames(s.tab, {
                  [s.tab__active]: activeTabIndex === i,
                })}
              >
                {item}
              </Tab>
            ))}
            <div>
              <Button
                title="Вийти з акаунту"
                className={s.logout__button}
                onClick={showLogoutModal}
              >
                <SignOutAlt className={s.logout__icon} />
              </Button>
            </div>
          </TabList>
          <TabPanel>
            <Link to="/admin/create-order">
              <Button className={s.add__button} title="Створити замовлення">
                <Plus className={s.add__more__icon} />
              </Button>
            </Link>
            <div className={s.order__header}>
              <span>Номер замовлення</span>
              <span>Дата створення</span>
              <span>Статус</span>
              <span>Спосіб оплати</span>
              <span>Спосіб доставки</span>
              <span>Загальна сума</span>
              <span>Дії</span>
            </div>
            {orders.map((order, i) => {
              const {
                sum,
                _id,
                createdAt,
                paymentType,
                delivery,
                status,
                products,
              } = order;

              return (
                <AdminRow
                  items={[
                    { title: i, key: `${_id}number` },
                    {
                      title: new Date(createdAt).toISOString().split("T")[0],
                      key: `${_id}createdAt`,
                    },
                    {
                      title: status,
                      key: `${_id}status`,
                    },
                    {
                      title: paymentType,
                      key: `${_id}paymentType`,
                    },
                    {
                      title: delivery,
                      key: `${_id}delivery`,
                    },
                    {
                      title: sum,
                      key: `${_id}sum`,
                    },
                  ]}
                  onDelete={() => deleteOrder(_id)}
                  isExpanding
                  onClick={() => {
                    if (!ordersProducts[order._id]) {
                      getOrderProducts(order);
                    }
                  }}
                >
                  {ordersProducts[order._id]?.map((product) => (
                    <OrderProductCard
                      key={`${product._id}order`}
                      {...{ product }}
                    />
                  ))}
                </AdminRow>
              );
            })}
          </TabPanel>
          <TabPanel>
            <Link to="/admin/create-product">
              <Button title="Додати товар">
                <Plus className={s.add__more__icon} />
              </Button>
            </Link>

            <ProductsView />
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                name: "",
                parentCategory: null,
                parentCategoryLabel: null,
              }}
              onSubmit={async ({ name, parentCategory }, { resetForm }) => {
                const categoryToSubmit = {
                  parentID: parentCategory?._id,
                  subParentID: null,
                  title: name,
                };
                if (parentCategory?.parent?.length) {
                  categoryToSubmit.parent = parentCategory.parent;
                  categoryToSubmit.sub = [
                    { title: parentCategory.title, _id: parentCategory._id },
                  ];
                }
                let isSuccess = false;
                isSuccess = await createCategory(categoryToSubmit);
                if (isSuccess) {
                  resetForm({
                    name: "",
                    parentCategory: null,
                    parentCategoryLabel: null,
                  });
                  if (isCategoryEditing) {
                    showAlert("Категорію змінено успішно!", "success");
                  } else {
                    showAlert("Категорію створено успішно!", "success");
                  }
                } else {
                  showAlert("Сталась помилка!", "error");
                }
                resetForm({
                  name: "",
                  parentCategory: null,
                  parentCategoryLabel: null,
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setValues,
              }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  >
                    <div className={s.add__category__container}>
                      <Input
                        name="name"
                        label="Назва категорії"
                        placeholder="Інгалятори"
                        value={values.name}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                      />
                      <Select
                        label="Назва батьківської категорії"
                        containerClass={s.add__category__select__container}
                        value={values.parentCategoryLabel}
                        onSelect={(selectedOption) => {
                          setValues({
                            ...values,
                            parentCategory: selectedOption.value,
                            parentCategoryLabel: selectedOption.label,
                          });
                        }}
                        options={categories
                          .filter(({ sub }) => !sub?.length)
                          .map(({ title, parent, _id }) => {
                            const isParentVisible = parent?.length;
                            return {
                              label: `${title}${
                                isParentVisible
                                  ? `, батьківська категорія - ${parent[0].title}`
                                  : ""
                              }`,
                              value: {
                                title,
                                _id,
                                parent,
                              },
                            };
                          })}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className={s.add__button}
                      title="Додати категорію"
                    >
                      <Plus className={s.add__more__icon} />
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <div className={s.order__header}>
              <span>Назва</span>
              <span>Назва батьківської категорії</span>
              <span>Дії</span>
            </div>

            {categories &&
              categories.map(({ sub, parent, _id, title }) => {
                let parentLabel = "";
                if (parent?.length && !sub?.length) {
                  parentLabel = parent[0].title;
                } else if (sub?.length) {
                  parentLabel = sub[0].title;
                }
                return (
                  <AdminRow
                    key={_id}
                    onDelete={() => deleteCategory(_id)}
                    onEdit={() => {}}
                    items={[
                      { title, key: `${_id}title` },
                      { title: parentLabel, key: `${_id}parent` },
                    ]}
                  />
                );
              })}
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async ({ name }, { resetForm }) => {
                if (name) {
                  let isSuccess = false;
                  if (isAttributeEditing) {
                    const { _id } = editing.attribute;
                    isSuccess = await editAttribute({ name, _id });
                  } else {
                    isSuccess = await createAttribute({ name });
                  }
                  if (isSuccess) {
                    resetForm({ name: "" });
                    if (isAttributeEditing) {
                      showAlert("Атрибут змінено успішно!", "success");
                    } else {
                      showAlert("Атрибут створено успішно!", "success");
                    }
                  } else {
                    showAlert("Сталась помилка!", "error");
                  }
                  resetForm({ name: "" });
                }
              }}
            >
              {({ handleChange, handleSubmit, values, setValues }) => (
                <>
                  <form className={s.form}>
                    <Input
                      label="Назва атрибута"
                      onChange={handleChange}
                      placeholder="Розмір"
                      containerClass={s.add__category__input__container}
                      inputClass={s.add__category__input}
                      value={values.name}
                      name="name"
                    />
                    <Button
                      onClick={handleSubmit}
                      className={s.add__button}
                      title={
                        isAttributeEditing
                          ? "Змінити атрибут"
                          : "Додати атрибут"
                      }
                      type="submit"
                    >
                      <Plus className={s.add__more__icon} />
                    </Button>
                    {isAttributeEditing && (
                      <Button
                        onClick={() => {
                          setValues({ name: "" });
                          setEditing((prev) => ({
                            ...prev,
                            attribute: {},
                          }));
                        }}
                        className={s.remove__button}
                        title="Зупинити редагування"
                        isSecondary
                        type="submit"
                      >
                        <Minus className={s.add__more__icon} />
                      </Button>
                    )}
                  </form>
                  <div className={s.order__header}>
                    <span>Назва атрибута</span>
                    <span>Дії</span>
                  </div>
                  {attributes.map(({ _id, name }) => (
                    <AdminRow
                      key={_id}
                      items={[{ title: name, key: _id }]}
                      onEdit={() => {
                        setValues({ name });
                        setEditing((prev) => ({
                          ...prev,
                          attribute: { _id, name },
                        }));
                      }}
                      onDelete={() => deleteAttribute(_id)}
                    />
                  ))}
                </>
              )}
            </Formik>
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                title: "",
              }}
              onSubmit={async ({ title }, { resetForm }) => {
                let isSuccess = false;
                if (isVendorEditing) {
                  //ASD
                  isSuccess = await editVendor({
                    ...editing.vendor,
                    title,
                    desc: "",
                  });
                } else {
                  isSuccess = await createVendor({ title });
                }
                if (isSuccess) {
                  resetForm({ title: "" });
                  if (isVendorEditing) {
                    showAlert("Продавця змінено успішно!", "success");
                  } else {
                    showAlert("Продавця створено успішно!", "success");
                  }
                } else {
                  showAlert("Сталась помилка!", "error");
                }
              }}
            >
              {({ handleChange, handleSubmit, values, setValues }) => {
                return (
                  <div>
                    <div className={s.seller__container}>
                      <Input
                        name="title"
                        label="Назва продавця"
                        placeholder="Germany"
                        value={values.title}
                        containerClass={s.add__category__input__container}
                        inputClass={s.add__category__input}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className={s.add__button}
                      title={
                        isVendorEditing
                          ? "Редагувати продавця"
                          : "Додати продавця"
                      }
                      type="submit"
                    >
                      <Plus className={s.add__more__icon} />
                    </Button>
                    {isVendorEditing && (
                      <Button
                        onClick={() =>
                          setEditing((prev) => ({ ...prev, vendor: {} }))
                        }
                        className={s.add__button}
                        title="Зупинити редагування"
                        type="submit"
                      >
                        <Minus className={s.add__more__icon} />
                      </Button>
                    )}
                    <div className={s.order__header}>
                      <span>Назва</span>
                      <span>Кількість продуктів</span>
                    </div>
                    {vendors.map((vendor) => {
                      const { title, _id } = vendor;
                      return (
                        <AdminRow
                          onEdit={() =>
                            editingHandler("vendor", setValues, vendor, {
                              title: vendor.title,
                            })
                          }
                          onDelete={() => deleteVendor(vendor)}
                          items={[{ title, key: _id }]}
                        />
                      );
                    })}
                  </div>
                );
              }}
            </Formik>
          </TabPanel>
          <TabPanel>
            <div className={s.create__container}>
              <Link to="/admin/create-user">
                <Button title="Створити користувача" className={s.create__btn}>
                  <Plus className={s.add__more__icon} />
                </Button>
              </Link>
            </div>
            <div className={s.order__header}>
              <span>Ім'я</span>
              <span>Прізвище</span>
              <span>Номер телефону</span>
              <span>Дії</span>
            </div>
            {users.map(({ fName, lName, phone, _id }) => (
              <AdminRow
                key={_id}
                items={[
                  { title: fName, key: `${_id}fName` },
                  { title: lName, key: `${_id}lName` },
                  { title: phone, key: `${_id}phone` },
                ]}
                onEdit={() => h.push(`/admin/edit-user/${_id}`)}
                onDelete={() => deleteUser(_id)}
              />
            ))}
          </TabPanel>
          <TabPanel>
            <div className={s.create__container}>
              <Link to="/admin/create-news">
                <Button title="Створити новину" className={s.create__btn}>
                  <Plus className={s.add__more__icon} />
                </Button>
              </Link>
            </div>
            <div className={s.order__header}>
              <span>Заголовок</span>
              <span>Текст</span>
              <span>Дата створення</span>
              <span>Дії</span>
            </div>

            <div className={s.section}>
              {/* <h3 className={s.section__title}>Новини</h3> */}

              {allNews.map(({ _id, createdAt, title, desc }) => (
                <AdminRow
                  items={[
                    { title: title.slice(0, 20), key: `${_id}title` },
                    { title: `${desc.slice(0, 20)}...`, key: `${_id}desc` },
                    {
                      title: new Date(createdAt).toISOString().split("T")[0],
                      key: `${_id}date`,
                    },
                  ]}
                  onEdit={() => h.push(`/admin/edit-news/${_id}`)}
                  onDelete={() => deleteNews(_id)}
                  key={_id}
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className={s.order__header}>
              <span>Текст</span>
              <span>Контакти</span>
              <span>Дата створення</span>
              <span>Дії</span>
            </div>

            {contactMessages.map((messageObj) => {
              const {
                message,
                _id,
                email = "",
                createdAt,
                phone = "",
                read,
              } = messageObj;
              const isExpanded = expandedMessagesIds.includes(_id);
              return (
                <AdminRow
                  items={[
                    {
                      title: isExpanded
                        ? message
                        : `${message.slice(0, 20)}...`,
                      key: `${_id}msg`,
                    },
                    {
                      title: isExpanded ? `${email}\n${phone}` : email || phone,
                      key: `${_id}contact`,
                    },
                    {
                      title: new Date(createdAt).toISOString().split("T")[0],
                      key: `${_id}date`,
                    },
                  ]}
                  onClick={() => expandMessageHandler(messageObj)}
                  className={classnames(s.message, {
                    [s.not__read__message]: !read,
                  })}
                  onDelete={() => deleteMessage(_id)}
                  key={_id}
                />
              );
            })}
          </TabPanel>
        </Tabs>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allProducts: state.products.all,
    allNews: state.news.all,
    cartProducts: state.cart.all,
    categories: state.products.categories,
    attributes: state.admin.attributes,
    users: state.admin.users,
    vendors: state.admin.vendors,
    isLoading: state.base.isLoading,
    contactMessages: state.contact.messages,
    orders: state.admin.orders,
    ordersProducts: state.admin.ordersProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategoriesAction()),
    getVendors: () => dispatch(getVendorsAction()),
    getAttributes: () => dispatch(getAttributesAction()),
    getUsers: () => dispatch(getUsersAction()),
    getNews: () => dispatch(getAllNewsAction()),
    getOrders: () => dispatch(getOrdersAction()),
    getContactMessages: () => dispatch(getContactMessagesAction()),
    getOrderProducts: (order) => dispatch(getOrderProductsAction(order)),
    deleteAttribute: (id) => dispatch(deleteAttributeAction(id)),
    deleteCategory: (id) => dispatch(deleteCategoryAction(id)),
    deleteNews: (id) => dispatch(deleteNewsAction(id)),
    deleteVendor: (id) => dispatch(deleteVendorAction(id)),
    deleteUser: (id) => dispatch(deleteUserAction(id)),
    deleteMessage: (id) => dispatch(deleteMessageAction(id)),
    deleteOrder: (id) => dispatch(deleteOrderAction(id)),
    createCategory: (category) => dispatch(createCategoryAction(category)),
    createVendor: (vendor) => dispatch(createVendorAction(vendor)),
    createAttribute: (attribute) => dispatch(createAttributeAction(attribute)),
    editAttribute: (attribute) => dispatch(editAttributeAction(attribute)),
    editVendor: (vendor) => dispatch(editVendorAction(vendor)),
    showModal: (content, onSubmit, onReject) =>
      dispatch(showModalAction(content, onSubmit, onReject)),
    logout: () => dispatch(logoutAction()),
    readMessage: (message) => dispatch(readMessageAction(message, message._id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
