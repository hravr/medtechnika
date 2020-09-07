import React, {useState, useEffect, useRef} from "react";
import s from "./Order.module.css";
import {connect} from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Select from "../../misc/Select/Select";
import Button from "../../misc/Button/Button";
import {useHistory} from "react-router-dom";
import CartProduct from "../../misc/CartProductCard/CartProduct";
import {
    addToCartAction,
    removeFromCartAction,
    setFullPriceAction,
    setCart,
} from "../../store/actions/cartActions";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import {Formik, withFormik} from "formik";
import Input from "../../misc/Inputs/Input/Input";
import {
    getCitiesAction,
    getWarehousesAction,
    setSelectedCityAction,
    setSelectedWarehouseAction,
    submitOrderAction,
} from "../../store/actions/orderActions";
import OrderProductCard from "../../misc/OrderProductCard/OrderProductCard";
import {patchUserAction} from "../../store/actions/profileActions";
import {showAlertAction} from "../../store/actions/alertActions";
import GoBackBtn from "../../misc/GoBackBtn/GoBackBtn";
import {ReactComponent as ShoppingCart} from "../../assets/shopping-cart.svg";

const deliveryOptions = [
    {value: "self-pickup", label: "Самовивіз"},
    {value: "NovaPoshta", label: "Нова пошта"},
];

const payOptions = [
    {value: "cash", label: "Наложений платіж"},
    {value: "card", label: "Картою"},
];

const CreateOrder = ({
                         cartProducts,
                         fullPrice,
                         setFullPrice,
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
                         user,
                         patchUser,
                         handleChange,
                         values,
                         setValues,
                         handleSubmit,
                     }) => {
    const breadCrumbsItems = [
        {
            name: "Кошик",
            path: "/cart",
            icon: <ShoppingCart className={s.bread__crumbs}/>,
        },
        {name: "Замовлення", path: "/order"},
    ];

    const switchSaveUser = () => {
        setValues({...values, isSaveUser: !values.isSaveUser});
    };

    const selectHandler = (option, type) => {
        setValues({...values, [type]: option});
    };

    const onCitiesScroll = ({target}, searchValue) => {
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

    const onWarehousesScroll = ({target}, searchValue) => {
        if (
            target.scrollHeight - target.scrollTop < 400 &&
            warehouses.length % 20 === 0
        ) {
            filterWarehouses(searchValue, warehouses.length + 20);
        }
    };

    const onWarehouseSearchChange = (value) => {
    };

    const onWarehouseSelect = (option) => {
        setSelectedWarehouse(option.label);
    };

    const h = useHistory();

    useEffect(() => {
        setFullPrice(
            cartProducts.reduce(
                (acc, {price, numberInCart = 1, selectedAttributesPrice}) => {
                    const productPrice = +selectedAttributesPrice || price;
                    return acc + productPrice * numberInCart;
                },
                0
            )
        );
    }, [cartProducts]);

    useEffect(() => {
        getCities();
    }, []);

    useEffect(() => {
        setValues({...values, fName: user.fName, lName: user.lName});
    }, [user]);

    return (
        <div className={s.container}>
            <div className={s.title__container}>
                <h4 className={s.title}>Замовлення</h4>
                <BreadCrumbs items={breadCrumbsItems}/>
            </div>
            <FixedWrapper>
                <div className={s.order__container}>
                    <div className={s.products__container}>
                        {cartProducts.map((product) => (
                            <OrderProductCard isSmall {...{product}} key={product._id}/>
                        ))}
                        <div className={s.subtotal__container}>
                            <div className={s.subtotal__title}>Ціна:</div>
                            <div className={s.subtotal__price}>{fullPrice}₴</div>
                        </div>
                    </div>
                    <div className={s.submit__container_all}>
                        <div className={s.submit__container}>
                            <h2 className={s.submit__title}>Оформити замовлення</h2>
                            <div className={s.input__row}>
                                <Input
                                    name="fName"
                                    inputClass={s.input}
                                    containerClass={s.input__container}
                                    value={values.fName}
                                    onChange={handleChange}
                                    label="Ім'я"
                                    placeholder="John"
                                />
                                <Input
                                    placeholder="Doe"
                                    name="lName"
                                    inputClass={s.input}
                                    containerClass={s.input__container}
                                    value={values.lName}
                                    onChange={handleChange}
                                    label="Прізвище"
                                />
                            </div>
                            <Select
                                containerClass={s.section}
                                options={payOptions}
                                onSelect={(option) => selectHandler(option, "paymentType")}
                                label="Тип оплати"
                                value={values.paymentType.label}
                            />
                            <Select
                                containerClass={s.section}
                                options={deliveryOptions}
                                onSelect={(option) => selectHandler(option, "deliveryType")}
                                label="Тип доставки"
                                value={values.deliveryType.label}
                            />
                            <Select
                                containerClass={s.section}
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
                                containerClass={s.section}
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
                            <div className={s.actions__container}>
                                <div className={s.save__user__container}>
                                    <input
                                        type="checkbox"
                                        name="isSaveUser"
                                        onChange={handleChange}
                                        checked={values.isSaveUser}
                                        className={s.save__user__checkbox}
                                    />
                                    <p className={s.save__user__desc} onClick={switchSaveUser}>
                                        Оновити мій профіль
                                    </p>
                                </div>
                                <div className={s.submit__btn__container}>
                                    <Button
                                        title="Підтвердити замовлення"
                                        onClick={handleSubmit}
                                        isDisabled={!values.fName || !values.lName}
                                        className={s.submit__btn}
                                    />
                                </div>
                                <GoBackBtn/>
                            </div>
                        </div>
                    </div>
                </div>
            </FixedWrapper>
        </div>
    );
};

const formikHOC = withFormik({
    mapPropsToValues: (props) => ({
        lName: props.user.fName,
        fName: props.user.lName,
        deliveryType: deliveryOptions[0],
        paymentType: payOptions[0],
        isSaveUser: false,
    }),
    handleSubmit: async (
        values,
        {
            props: {
                cartProducts,
                patchUser,
                user,
                createOrder,
                fullPrice,
                showAlert,
                setCart,
                selectedCity,
                selectedWarehouse
            },
            resetForm,
        }
    ) => {
        const products = cartProducts.map(
            ({selectedAttributesId, _id, quantity}) => ({
                attrOptions: selectedAttributesId,
                id: _id,
                quantity,
            })
        );
        if (values.isSaveUser) {
            patchUser({...user, fName: values.fName, lName: values.lName});
        }
        console.log("selectedWarehouse ===", selectedWarehouse)
        console.log("selectedCity ===", selectedCity)
        const isSuccess = await createOrder({
            products,
            delivery:
            values.deliveryType.value,
            phone: 99135713,
            deliveryCity: selectedCity,
            deliveryHouse: null,
            deliveryStreet: null,
            deliveryApartament: null,
            deliveryWarehouse: selectedWarehouse,
            paymentType: values.paymentType.value,
            sum: fullPrice,
            userID: user._id,
            status: "created",
        });
        if (isSuccess) {
            showAlert("Замовлення створено успішно!", "success");
            setCart([]);
            localStorage.removeItem("_cart");
            resetForm({
                lName: "",
                fName: "",
                deliveryType: deliveryOptions[0],
                paymentType: payOptions[0],
                isSaveUser: false,
            });
        } else {
            showAlert("Сталась помилка при створенні замовлення.");
        }
    },
})(CreateOrder);

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cart.all,
        fullPrice: state.cart.fullPrice,
        cities: state.order.cities,
        warehouses: state.order.warehouses,
        selectedWarehouse: state.order.selectedWarehouse,
        selectedCity: state.order.selectedCity,
        user: state.profile,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCartAction(product)),
        removeFromCart: (product) => dispatch(removeFromCartAction(product)),
        setFullPrice: (fullPrice) => dispatch(setFullPriceAction(fullPrice)),
        getCities: () => dispatch(getCitiesAction()),
        filterCities: (filterValue, limit) =>
            dispatch(getCitiesAction(filterValue, limit)),
        getWarehouses: (city) => dispatch(getWarehousesAction(city)),
        filterWarehouses: (filterValue) =>
            dispatch(getWarehousesAction(filterValue)),
        setSelectedCity: (city) => dispatch(setSelectedCityAction(city)),
        setSelectedWarehouse: (warehouse) =>
            dispatch(setSelectedWarehouseAction(warehouse)),
        patchUser: (user, token) => dispatch(patchUserAction(user, token)),
        createOrder: (order) => dispatch(submitOrderAction(order)),
        showAlert: (content, type) => dispatch(showAlertAction(content, type)),
        setCart: (cart) => dispatch(setCart(cart)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
