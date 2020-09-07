import React, { useEffect, useState, useRef, useMemo } from "react";
import s from "./SingleProduct.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import {
  getSingleProductAction,
  clearSingleProductAction,
} from "../../store/actions/singleProductActions";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import ProductAttribute from "../../misc/ProductAttribute/ProductAttribute";
import _axios from "../../store/api/_axios";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Stars from "../../misc/Stars/Stars";
import Button from "../../misc/Button/Button";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/cartActions";
import classnames from "classnames";
import { scrollToRef, isEqual } from "../../utils/utils";
import ProductCard from "../../misc/ProductCard/ProductCard";
import {
  showAlertAction,
  hideAlertAction,
} from "../../store/actions/alertActions";
import ScrollListener from "react-scroll-listener";
import { Formik } from "formik";
import Input from "../../misc/Inputs/Input/Input";
import { createReviewAction } from "../../store/actions/productsActions";
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up.svg";
import { ReactComponent as PencilAlt } from "../../assets/pencil-alt.svg";

const SingleProduct = ({
  match,
  getProduct,
  product = {},
  cartProducts,
  addToCart,
  removeFromCart,
  showAlert,
  clearProduct,
  user,
  createReview,
}) => {
  //state
  const {
    price,
    title,
    gallery,
    desc,
    vendorID,
    categoryID,
    categories,
    quantity,
    attr: attributes,
    reviews,
    _id,
    article,
    attrOptions: attributeOptions,
  } = product || {};

  const [filteredAttributes, setFilteredAttributes] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [priceInfo, setPriceInfo] = useState({ value: null, string: "" });
  const [isInCart, setInCart] = useState(false);
  const [isTopButtonVisible, setTopButtonVisible] = useState(false);
  const [foundAttributes, setFoundAttributes] = useState({});

  const mainContentRef = useRef();
  const attributesRef = useRef();

  const isPriceChanges = useMemo(() => {
    return !!attributeOptions?.filter((option) => !!option.priceAttr).length;
  }, [attributeOptions]);
  const isReview = !!reviews?.length;

  const h = useHistory();

  //functions
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const selectAttribute = (name, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [name]: value }));
  };

  const onCartButtonClick = () => {
    if (!foundAttributes._id && attributes.length) {
      showAlert("Перед додаванням у корзину оберіть атрибути");
      if (window.innerWidth <= 575) {
        scrollToRef(attributesRef, -120);
      }
      return;
    }
    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product, foundAttributes);
    }
  };

  const scrollToDescription = () => {
    scrollToRef(mainContentRef);
    setActiveTabIndex(0);
  };

  const onScroll = () => {
    const scrollTopValue = window.pageYOffset;
    if (scrollTopValue >= 600) {
      setTopButtonVisible(true);
    } else if (scrollTopValue < 600) {
      setTopButtonVisible(false);
    }
  };

  //effects
  useEffect(() => {
    getProduct(match.params.id);
    const scrollListener = new ScrollListener();
    scrollListener.addScrollHandler("1", onScroll);
    return () => {
      document.title = "Медтехніка";
      clearProduct();
    };
  }, []);

  useEffect(() => {
    const productFromCart = cartProducts.filter(
      (cartProduct) => cartProduct._id === _id
    )[0];

    setInCart(!!productFromCart);
  }, [cartProducts, _id]);

  useEffect(() => {
    if (attributes?.length) {
      const filteredObject = {};
      let minimumPrice = 0;
      Object.values(attributes).forEach((possibleAttribute, index) => {
        const fil = attributeOptions.map((attributesObj, i) => {
          if (index === 0) {
            if (!minimumPrice || minimumPrice > attributesObj.priceAttr) {
              minimumPrice = attributesObj.priceAttr;
            }
          }
          return attributesObj[possibleAttribute];
        });
        const map = Array.from(new Set(fil));
        filteredObject[possibleAttribute] = { all: map, active: null };
      });
      if (isPriceChanges) {
        setPriceInfo({
          string: `Від ${minimumPrice}₴`,
          value: null,
        });
      }
      setFilteredAttributes(filteredObject);
    }
    if (_id) {
      document.title = title;
    }
  }, [product]);

  useEffect(() => {
    if (attributeOptions?.length) {
      const attributeFound = attributeOptions.find((attributeObj) =>
        isEqual(
          { ...attributeObj, priceAttr: null, _id: null },
          { ...selectedAttributes, priceAttr: null, _id: null }
        )
      );

      if (attributeFound && isPriceChanges) {
        setPriceInfo({
          value: attributeFound.priceAttr,
          string: `${attributeFound.priceAttr}₴`,
        });
      }
      setFoundAttributes(attributeFound || {});
    }
  }, [selectedAttributes]);

  //other
  let qtyMessage = "Залишилось мало";
  if (quantity >= 5) {
    qtyMessage = "В наявності";
  } else if (quantity === 0) {
    qtyMessage = "Немає в наявності";
  }

  let qtyClassName = s.lastInStock;
  if (quantity >= 5) {
    qtyClassName = s.inStock;
  } else if (quantity === 0) {
    qtyClassName = s.notInStock;
  }

  return product ? (
    <FixedWrapper>
      <div className={s.container}>
        <div className={s.desktop__container}>
          <div className={s.carousel__container}>
            <ItemsCarousel arrows={false} dots slidesPerPage={1}>
              {gallery?.length ? (
                gallery.map((img, i) => (
                  <img
                    className={s.main__image}
                    key={img + i}
                    src={img || require("../../assets/image-placeholder.webp")}
                    alt="loading"
                  />
                ))
              ) : (
                <img
                  src={require("../../assets/image-placeholder.webp")}
                  className={s.main__image}
                  alt="loading"
                />
              )}
            </ItemsCarousel>
          </div>
          <div className={s.desktop__info__container}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.price__container}>
              <h2 className={s.price}>{priceInfo.string || `${price}₴`}</h2>
              <div className={s.button__container}>
                <Button
                  title={isInCart ? "В кошику" : "Додати в кошик"}
                  className={classnames({
                    [s.active__cart__button]: isInCart,
                  })}
                  onClick={onCartButtonClick}
                />
              </div>
            </div>
            <p className={s.desc}>
              {desc.slice(0, 300)}
              <button onClick={scrollToDescription}>Більше</button>
            </p>
            <div className={s.attributes__wrapper} ref={attributesRef}>
              {Object.entries(filteredAttributes).map((attributesObj, i) => {
                const name = attributesObj[0];
                const values = attributesObj[1].all;
                return (
                  <ProductAttribute
                    key={name}
                    isClickable
                    {...{ name }}
                    {...{ values }}
                    {...{ selectAttribute }}
                  />
                );
              })}
              {!!vendorID?._id && (
                <ProductAttribute
                  name="Країна виробника"
                  values={[vendorID?.title]}
                />
              )}
              {!!categoryID?._id && (
                <ProductAttribute
                  name="Категорія"
                  values={[categoryID?.title]}
                />
              )}
              <ProductAttribute
                name="Кількість"
                attributeClasses={qtyClassName}
                values={[qtyMessage]}
              />
            </div>
          </div>
        </div>
        <div className={s.full__content} ref={mainContentRef}>
          <Tabs>
            <div className={s.tabs__container}>
              <TabList className={s.tabs}>
                {["Опис товару", "Відгуки", "Доставка"].map((tab, i) => (
                  <Tab
                    onClick={() => setActiveTabIndex(i)}
                    className={classnames(s.tab, {
                      [s.active__tab]: activeTabIndex === i,
                    })}
                    key={i}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>
            </div>
            <TabPanel className={s.tab__content}>
              <p className={s.desc}>{desc}</p>
            </TabPanel>
            <TabPanel className={s.tab__content}>
              {reviews.map(
                (
                  {
                    userID: reviewUserID,
                    _id: reviewId,
                    title: reviewTitle,
                    desc: reviewDesc,
                    rating,
                  },
                  i
                ) => (
                  <div key={reviewId} className={s.review}>
                    <div className={s.review__header}>
                      <h4 className={s.review__admin}>{reviewUserID.fName}</h4>

                      <Stars value={rating} />
                    </div>
                    <h5 className={s.review__title}>{reviewTitle}</h5>

                    <p className={s.review__desc}>{reviewDesc}</p>
                  </div>
                )
              )}
              <Formik
                initialValues={{
                  desc: "",
                  title: "",
                  rating: 5,
                }}
                onSubmit={async (values, { resetForm }) => {
                  const reviewToSubmit = {
                    ...values,
                    productID: _id,
                    userID: user._id,
                  };
                  const isSuccess = await createReview(reviewToSubmit);
                  if (isSuccess) {
                    showAlert("Відгук створено успішно!", "success");
                    resetForm({ desc: "", title: "", rating: 5 });
                  } else {
                    showAlert("Сталась помилка при створенні відгука.");
                  }
                }}
              >
                {({ handleChange, handleSubmit, values, setValues }) => (
                  <form className={s.review__form}>
                    <div className={s.review__form__inner}>
                      <h1 className={s.review__form__title}>Залишіть відгук</h1>
                      <Input
                        label="Заголовок"
                        name="title"
                        placeholder="Інгалятором задоволений"
                        containerClass={s.review__input__container}
                        onChange={handleChange}
                      />
                      <Input
                        label="Опишіть ваші враження"
                        name="desc"
                        isTextarea
                        placeholder="Все сподобалось, інгалятор підійшов чудово!"
                        containerClass={s.review__input__container}
                        inputClass={s.review__textarea}
                        onChange={handleChange}
                      />
                      <Stars
                        value={values.rating}
                        isStatic={false}
                        setValue={(rating) => {
                          setValues({ ...values, rating });
                        }}
                      />
                      {/* <Button size="lg" title="Залишити відгук" /> */}
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
                  </form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel className={s.tab__content}>
              <p className={s.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {isTopButtonVisible && (
        <Button className={s.arrow__button} onClick={scrollTop}>
          <ArrowUp className={s.arrow__button__icon} />
        </Button>
      )}
      <div>
        <div itemType="http://schema.org/Product" itemScope>
          <meta itemProp="name" content={title} />
          <link itemProp="image" href={gallery[0]} />
          <link itemProp="image" href={gallery[1]} />
          <link itemProp="image" href={gallery[2]} />
          <meta itemProp="description" content={desc} />
          <div itemProp="offers" itemType="http://schema.org/Offer" itemScope>
            <link itemProp="url" href={window.location.href} />
            <meta itemProp="priceCurrency" content="UAH" />
            <meta itemProp="price" content={price} />
            <div
              itemProp="seller"
              itemType="http://schema.org/Organization"
              itemScope
            >
              <meta itemProp="name" content={vendorID?.title} />
            </div>
          </div>
          <div
            itemProp="aggregateRating"
            itemType="http://schema.org/AggregateRating"
            itemScope
          >
            <meta itemProp="reviewCount" content="89" />
            <meta
              itemProp="ratingValue"
              content={
                reviews.reduce((prev, curr) => prev + curr.rating, 0) /
                  reviews.length || 5
              }
            />
          </div>
          <div itemProp="review" itemType="http://schema.org/Review" itemScope>
            <div
              itemProp="author"
              itemType="http://schema.org/Person"
              itemScope
            >
              <meta itemProp="name" content={reviews[0]?.userID?.fName} />
            </div>
            <div
              itemProp="reviewRating"
              itemType="http://schema.org/Rating"
              itemScope
            >
              <meta itemProp="ratingValue" content={reviews[0]?.rating} />
              <meta
                itemProp="bestRating"
                content={Math.max(reviews.map((review) => review.rating))}
              />
            </div>
          </div>
          <meta itemProp="sku" content={article} />
        </div>
      </div>
    </FixedWrapper>
  ) : (
    <div className={s.container} />
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.single.product,
    cartProducts: state.cart.all,
    popularProducts: state.products.popular,
    user: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getSingleProductAction(id)),
    clearProduct: () => dispatch(clearSingleProductAction()),
    addToCart: (product, attributes) =>
      dispatch(addToCartAction(product, attributes)),
    removeFromCart: (product) => dispatch(removeFromCartAction(product)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
    hideAlert: () => dispatch(hideAlertAction()),
    createReview: (review) => dispatch(createReviewAction(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
