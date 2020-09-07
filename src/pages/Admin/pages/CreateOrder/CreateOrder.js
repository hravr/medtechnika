import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./CreateOrder.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../../../misc/Button/Button";
import {
  getProductsByPage,
  filterProductsAction,
  getProducts,
} from "../../../../store/actions/productsActions";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import { Formik, withFormik } from "formik";
import CartProduct from "../../../../misc/CartProductCard/CartProduct";
import {
  getUsersAction,
  filterUsersAction,
} from "../../../../store/actions/adminActions";
import { getUserByIdAction } from "../../../../store/actions/profileActions";
import {
  getCitiesAction,
  getWarehousesAction,
  setSelectedCityAction,
  setSelectedWarehouseAction,
  submitOrderAction,
} from "../../../../store/actions/orderActions";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import classnames from "classnames";
import AdminOrderProduct from "../../../../misc/Admin/AdminOrderProduct/AdminOrderProduct";
import { showAlertAction } from "../../../../store/actions/alertActions";

const CreateOrder = ({
  values,
  handleChange,
  setValues,
  products,
  filterProducts,
  getUsers,
  users,
  filterUsers,
  getCities,
  getWarehouses,
  cities,
  filterCities,
  setSelectedWarehouse,
  setSelectedCity,
  warehouses,
  filterWarehouses,
  selectedWarehouse,
  selectedCity,
  filteredUsers,
  getProductsByPage,
  errors,
  handleSubmit,
}) => {
  const [activeProductsPage, setActiveProductsPage] = useState(1);

  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];

  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Створити замовлення", path: "/admin/create-order" },
  ];

  const onAttributeSelect = (productId, i, priceAttr) => {
    if (values.productsAttributes.length) {
      setValues({
        ...values,
        productsAttributes: values.productsAttributes.map((attributeObj) => {
          return attributeObj.id === productId
            ? {
                ...attributeObj,
                id: productId,
                attrOptions: `${i}`,
              }
            : attributeObj;
        }),
        productsPrices: {
          ...values.productsPrices,
          [productId]: priceAttr || values.productsPrices[productId],
        },
      });
    } else {
      setValues({
        ...values,
        productsAttributes: [
          { id: productId, attrOptions: `${i}`, quantity: 1 },
        ],
        productsPrices: {
          ...values.productsPrices,
          [productId]: priceAttr || values.productsPrices[productId],
        },
      });
    }
  };

  const onQuantityChange = (productId, quantity) => {
    const isObjectAlreadyExist = !!values.productsAttributes.filter(
      (attributeObj) => {
        return attributeObj.id === productId;
      }
    ).length;
    if (!isObjectAlreadyExist) {
      setValues({
        ...values,
        productsAttributes: [
          ...values.productsAttributes,
          { id: productId, quantity },
        ],
      });
    } else {
      setValues({
        ...values,
        productsAttributes: values.productsAttributes.map((attributeObj) => {
          return attributeObj.id === productId
            ? {
                ...attributeObj,
                quantity,
              }
            : attributeObj;
        }),
      });
    }
  };

  const onPaymentTypeSelect = (option) => {
    setValues({ ...values, paymentType: option });
  };

  const onDeliveryTypeSelect = (option) => {
    setValues({ ...values, deliveryType: option });
  };

  const onProductsMenuScroll = ({ target }) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      products.length % 24 === 0
    ) {
      setActiveProductsPage((prev) => prev + 1);
    }
  };

  const onProductSearchChange = (searchValue) => {
    if (searchValue) {
      filterProducts(null, searchValue);
    }
  };

  const onProductSelect = ({ value }) => {
    setValues({
      ...values,
      products: [...values.products, value],
      productsPrices: { ...values.productsPrices, [value._id]: value.price },
    });
  };

  const onUserSelect = (option) => {
    setValues({ ...values, user: option.value });
  };

  const onUsersSearchChange = (searchValue) => {
    filterUsers(searchValue, users);
  };

  const onCitiesScroll = ({ target }, searchValue) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      cities.length % 20 === 0
    ) {
      filterCities(searchValue, cities.length + 20);
    }
  };

  const onCitySearchChange = (value) => {
    if (cities.length === 1 && value === cities[0].Description) {
      setSelectedCity(value);
      getWarehouses(value);
    }
    filterCities(value);
  };

  const onCitySelect = (option) => {
    setSelectedCity(option.label);
    getWarehouses(option.label);
  };

  const onWarehousesScroll = ({ target }, searchValue) => {
    if (
      target.scrollHeight - target.scrollTop < 400 &&
      warehouses.length % 20 === 0
    ) {
      filterWarehouses(searchValue, warehouses.length + 20);
    }
  };

  const onWarehouseSearchChange = (value) => {};

  const onWarehouseSelect = (option) => {
    setSelectedWarehouse(option.label);
  };

  const usersOptions = useMemo(() => {
    return filteredUsers.map((user) => ({
      label: `${user.fName} ${user.lName} ${user.phone}`,
      value: user,
    }));
  }, [filteredUsers]);

  const productsOptions = useMemo(() => {
    return products.map((product) => ({
      label: product.title,
      value: product,
    }));
  }, [products]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getProductsByPage(activeProductsPage);
  }, [activeProductsPage]);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення замовлення</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        {values.products.map((product) => {
          const selectedAttributeObj = values.productsAttributes.filter(
            (attributeObj) => attributeObj.id === product._id
          )[0];
          return (
            <AdminOrderProduct
              className={s.product}
              {...{ product }}
              selectedAttributeIndex={selectedAttributeObj?.attrOptions}
              price={values.productsPrices[product._id]}
              {...{ onQuantityChange }}
              {...{ onAttributeSelect }}
              {...{ selectedAttributeObj }}
              key={product._id}
            />
          );
        })}
        <div className={s.body}>
          <Select
            noDefaultValue
            clearInputOnSelect
            withSearch
            label="Додати товар"
            onSelect={onProductSelect}
            onSearchValueChange={onProductSearchChange}
            onMenuScroll={onProductsMenuScroll}
            options={productsOptions}
          />
          <Select
            noDefaultValue
            withSearch
            containerClass={s.input__container}
            label="Оберіть користувача"
            onSelect={onUserSelect}
            onSearchValueChange={onUsersSearchChange}
            onMenuScroll={onProductsMenuScroll}
            options={usersOptions}
          />
          <Select
            noDefaultValue
            containerClass={s.input__container}
            options={payOptions}
            onSelect={onPaymentTypeSelect}
            label="Тип оплати"
            value={values.paymentType.label}
          />
          <Select
            noDefaultValue
            containerClass={s.input__container}
            options={deliveryOptions}
            onSelect={onDeliveryTypeSelect}
            label="Тип доставки"
            value={values.deliveryType.label}
          />
          <Select
            containerClass={s.input__container}
            withSearch
            noDefaultValue
            onMenuScroll={onCitiesScroll}
            menuClass={s.select__menu}
            options={cities.map((city) => ({
              value: city.Description,
              label: city.Description,
            }))}
            onSelect={onCitySelect}
            onSearchValueChange={onCitySearchChange}
            label="Місто"
          />
          <Select
            containerClass={s.input__container}
            withSearch
            noDefaultValue
            onMenuScroll={onWarehousesScroll}
            menuClass={s.select__menu}
            options={warehouses.map((warehouse) => ({
              value: warehouse.Description,
              label: warehouse.Description,
            }))}
            onSelect={onWarehouseSelect}
            onSearchValueChange={onWarehouseSearchChange}
            label="Номер відділення"
          />
          <Input
            name="price"
            placeholder="10"
            label="Ціна"
            value={values.price}
            containerClass={s.input__container}
            onChange={handleChange}
          />
          <div className={s.submit__container}>
            <Button
              isDisabled={errors.user || errors.products || errors.price}
              title="Створити"
              size="lg"
              onClick={handleSubmit}
              type="submit"
            />
          </div>
          <GoBackBtn />
        </div>
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    price: "",
    products: [],
    productsAttributes: [],
    productsPrices: {},
    user: {},
    paymentType: {},
    deliveryType: {},
  }),
  validate: (values) => {
    const { price, products, user } = values;
    const errors = {};
    if (!price) {
      errors.price = "required";
    }
    if (!products.length) {
      errors.products = "required";
    }
    if (!user._id) {
      errors.user = "required";
    }
    return errors;
  },
  handleSubmit: async (
    values,
    { props: { submitOrder, showAlert }, resetForm }
  ) => {
    const orderToSubmit = {
      products: values.productsAttributes,
      userID: values.user._id,
      paymentType: values.paymentType.value,
      deliveryType: values.deliveryType.value,
      status: "created",
      sum: values.price,
    };

    const isSuccess = await submitOrder(orderToSubmit);

    if (isSuccess) {
      resetForm({
        price: "",
        products: [],
        productsAttributes: [],
        productsPrices: {},
        user: {},
        paymentType: {},
        deliveryType: {},
      });
      showAlert("Замовлення успішно створено!", "success");
    } else {
      showAlert("Сталась помилка при створенні замовлення, спробуйте пізніше");
    }
  },
})(CreateOrder);

const mapStateToProps = (state) => {
  return {
    products: state.products.filtered,
    users: state.admin.users,
    filteredUsers: state.admin.filteredUsers,
    cities: state.order.cities,
    warehouses: state.order.warehouses,
    selectedWarehouse: state.order.selectedWarehouse,
    selectedCity: state.order.selectedCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page) => dispatch(getProductsByPage(page)),
    filterProducts: (categoryId, searchValue) =>
      dispatch(filterProductsAction(categoryId, searchValue)),
    getUser: (id, redirect) => dispatch(getUserByIdAction(id, redirect)),
    getUsers: () => dispatch(getUsersAction()),

    filterUsers: (searchValue, users) =>
      dispatch(filterUsersAction(searchValue, users)),
    getCities: () => dispatch(getCitiesAction()),
    filterCities: (filterValue, limit) =>
      dispatch(getCitiesAction(filterValue, limit)),
    getWarehouses: (city) => dispatch(getWarehousesAction(city)),
    filterWarehouses: (filterValue) =>
      dispatch(getWarehousesAction(filterValue)),
    setSelectedCity: (city) => dispatch(setSelectedCityAction(city)),
    setSelectedWarehouse: (warehouse) =>
      dispatch(setSelectedWarehouseAction(warehouse)),
    submitOrder: (order) => dispatch(submitOrderAction(order, "admin")),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
