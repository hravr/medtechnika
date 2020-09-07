import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import s from "./Header.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { Link, withRouter } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { CSSTransition } from "react-transition-group";
import Input from "../Inputs/Input/Input";
import Button from "../Button/Button";
import {
  filterProductsAction,
  setSearchValueAction,
} from "../../store/actions/productsActions";
import { connect } from "react-redux";
import HorizontalProductCard from "../HorizontalProductCard/HorizontalProductCard";
import classnames from "classnames";
import ProfileModal from "../ProfileModal/ProfileModal";
import { ReactComponent as Phone } from "../../assets/phone.svg";
import { ReactComponent as Envelope } from "../../assets/envelope.svg";
import { ReactComponent as LocationArrow } from "../../assets/location-arrow.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as ListAlt } from "../../assets/list-alt.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as ShoppingCart } from "../../assets/shopping-cart.svg";
import { ReactComponent as Newspaper } from "../../assets/newspaper.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Key } from "../../assets/key.svg";
import { ReactComponent as Cogs } from "../../assets/cogs.svg";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Times } from "../../assets/times.svg";
import { ReactComponent as Bars } from "../../assets/bars.svg";

const Header = ({
  searchProductsByValue,
  foundProducts,
  history,
  setSearchValue,
  searchValue,
  numberInCart,
  user,
}) => {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(false);

  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const showProfileModal = () => setProfileModalVisible(true);
  const hideProfileModal = () => setProfileModalVisible(false);

  const openSidebar = () => {
    setBarOpen(true);
  };
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => {
    setBarOpen(state.isOpen);
  };

  const onSearchInputChange = ({ target }) => setSearchValue(target.value);
  const hideDropdown = () => setDropdownVisible(false);
  const onSearchInputFocus = () => setDropdownVisible(searchValue.length >= 3);

  const { pathname } = history.location;

  const onMobileSearchClick = () => {
    if (pathname.startsWith("/catalog")) {
      window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (searchValue.trim().length >= 3) {
      setDropdownVisible(true);
      searchProductsByValue(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (typeof isBarOpen !== "boolean") return;
    setAnimation((prev) => !prev);
    setTimeout(() => {
      setSidebarIcon((prev) => !prev);
    }, 200);
  }, [isBarOpen]);

  useEffect(() => {
    window.scroll({ left: 0, top: 0 });
    if (!isFirstLoad) {
      setFirstLoad(true);
      return;
    }
    if (isBarOpen) {
      setBarOpen(false);
    }
  }, [pathname]);

  const isLogged = document.cookie.includes("token");

  return (
    <>
      <FixedWrapper>
        <div className={s.header__container} onMouseLeave={hideProfileModal}>
          <header className={s.header}>
            <Link to="/">
              <img src={logo} className={s.logo} alt="logo" />

              {/* <LogoComponent /> */}
            </Link>
            <div className={s.contact}>
              <button className={s.header__info__tag}>
                <Phone className={s.header_icon} />
                +380-68-6358-298
              </button>
              <button className={s.header__info__tag}>
                <Envelope className={s.header_icon} />
                info@somedomain.com
              </button>
              <button className={s.header__info__tag}>
                <LocationArrow className={s.header_icon} />
                Розташування магазину
              </button>
            </div>
          </header>
          <div className={s.menu_main_wrapper}>
            <div className={s.main__nav}>
              <Link
                to="/"
                className={
                  pathname === "/"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                <Home className={s.header_icon} />
                Головна
              </Link>
              <Link
                to="/catalog"
                className={
                  pathname === "/catalog"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                <ListAlt className={s.header_icon} />
                Каталог
              </Link>
              <Link
                to="/wishlist"
                className={
                  pathname === "/wishlist"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                <Heart className={s.header_icon} />
                Улюблені
              </Link>

              <Link
                to="/cart"
                style={{ position: "relative" }}
                className={
                  pathname === "/cart"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                <ShoppingCart className={s.header_icon} />
                Кошик
              </Link>
              <Link
                to="/news"
                className={
                  pathname === "/news"
                    ? `${s.nav__link} ${s.nav__link__active}`
                    : s.nav__link
                }
              >
                <Newspaper className={s.header_icon} />
                Новини
              </Link>
            </div>
            <div className={s.search__container}>
              {isDropdownVisible && pathname !== "/catalog" && (
                <div onClick={hideDropdown} className={s.search__overlay} />
              )}
              <Input
                placeholder="Введіть пошуковий запит"
                containerClass={s.search__input__container}
                onChange={onSearchInputChange}
                onFocus={onSearchInputFocus}
              />
              <Link to="/catalog">
                <Button className={s.search__button}>
                  <Search className={s.search__icon} />
                </Button>
              </Link>
              {!!foundProducts.length &&
                isDropdownVisible &&
                pathname !== "/catalog" && (
                  <div className={s.search__dropdown}>
                    {foundProducts.slice(0, 5).map((foundProduct) => (
                      <Link
                        to={`product/${foundProduct._id}`}
                        onClick={hideDropdown}
                      >
                        <HorizontalProductCard
                          key={foundProduct._id}
                          isSmall
                          className={s.product}
                          product={foundProduct}
                        />
                      </Link>
                    ))}
                    <Link
                      className={s.search__see__more}
                      onClick={hideDropdown}
                      to={{
                        pathname: "/catalog",
                        state: { query: searchValue },
                      }}
                    >
                      Показати ще
                    </Link>
                  </div>
                )}
            </div>
            <div className={s.small_menu_item}>
              <div className={s.small_menu_button}>
                {user.isLogged && !user.isAdmin && user._id && (
                  <Link
                    to={`/profile/${user._id}`}
                    style={{ marginRight: 0 }}
                    className={classnames(s.nav__link, s.profile__nav__link, {
                      [s.nav__link__active]: pathname.startsWith("/profile"),
                    })}
                  >
                    <User className={s.header_icon} />
                    Мій профіль
                  </Link>
                )}
                {!user.isLogged && (
                  <Link
                    to="/login"
                    style={{ marginRight: 0 }}
                    className={classnames(s.nav__link, s.profile__nav__link, {
                      [s.nav__link__active]: pathname.startsWith("/login"),
                    })}
                  >
                    <Key className={s.header_icon} />
                    Увійти
                  </Link>
                )}
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    style={{ marginRight: 0 }}
                    className={classnames(s.nav__link, s.profile__nav__link, {
                      [s.nav__link__active]: pathname.startsWith("/admin"),
                    })}
                  >
                    <Cogs className={s.header_icon} />
                    Адмін
                  </Link>
                )}
                <ProfileModal
                  isVisible={
                    user.isLogged && !user.isAdmin && isProfileModalVisible
                  }
                  hide={hideProfileModal}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={s.mobile__header}>
          <CSSTransition
            in={isAnimation}
            timeout={400}
            classNames={{
              enterActive: s.burger__icon__entering,
              enterDone: s.burger__icon__entered,
              exitActive: s.burger__icon__exiting,
              exitDone: s.burger__icon__exited,
            }}
          >
            {sidebarIcon ? (
              <Times
                onClick={isBarOpen ? closeSidebar : openSidebar}
                className={s.burger__icon}
              />
            ) : (
              <Bars
                onClick={isBarOpen ? closeSidebar : openSidebar}
                className={s.burger__icon}
              />
            )}
          </CSSTransition>
          <div className={s.search__container}>
            {isDropdownVisible && pathname !== "/catalog" && (
              <div onClick={hideDropdown} className={s.search__overlay} />
            )}
            <Input
              placeholder="Введіть пошуковий запит"
              containerClass={s.search__input__container}
              onChange={onSearchInputChange}
              onFocus={onSearchInputFocus}
            />
            <Button className={s.search__button} onClick={onMobileSearchClick}>
              <Search className={s.search__icon} />
            </Button>
            {!!foundProducts.length &&
              isDropdownVisible &&
              pathname !== "/catalog" && (
                <div className={s.search__dropdown}>
                  {foundProducts.slice(0, 5).map((foundProduct) => (
                    <Link
                      to={`product/${foundProduct._id}`}
                      onClick={hideDropdown}
                    >
                      <HorizontalProductCard
                        key={foundProduct._id}
                        isSmall
                        className={s.mobile__search__product}
                        product={foundProduct}
                      />
                    </Link>
                  ))}
                  <Link
                    className={s.search__see__more}
                    onClick={hideDropdown}
                    to={{
                      pathname: "/catalog",
                      state: { query: searchValue },
                    }}
                  >
                    Показати ще
                  </Link>
                </div>
              )}
          </div>
          <Link to="/cart" style={{ position: "relative" }}>
            {!!numberInCart && (
              <div className={s.cart__counter}>
                <span>{numberInCart}</span>
              </div>
            )}

            <ShoppingBag className={s.cart__icon} />
          </Link>
        </div>
      </FixedWrapper>
      <Menu
        width="300px"
        isOpen={isBarOpen}
        burgerButtonClassName={s.menu_hidden}
        menuClassName={s.menu_color}
        crossButtonClassName={s.exit_hidden}
        bmMenuWrap={s.menu_width}
        className={isBarOpen === null ? s.display_none : ""}
        disableAutoFocus
        itemListClassName={s.mobile__nav}
        itemClassName={s.mobile__nav__item}
        onStateChange={onStateMenuChange}
      >
        <Link to="/" className={s.mobile__logo__container}>
          <img src={logo} className={s.mobile__logo} alt="logo" />
        </Link>
        <Link to="/">
          <Home className={s.header_icon} />
          Головна
        </Link>
        <Link to="/catalog">
          <ListAlt className={s.header_icon} />
          Каталог
        </Link>
        <Link to="/wishlist">
          <Heart className={s.header_icon} />
          Улюблені
        </Link>
        <Link to="/cart">
          <ShoppingCart className={s.header_icon} />
          Кошик
        </Link>
        <Link to="/news">
          <Newspaper className={s.header_icon} />
          Новини
        </Link>
        {user.isLogged && !user.isAdmin && (
          <Link to={`/profile/${user._id}`}>
            <User className={s.header_icon} />
            Мій профіль
          </Link>
        )}
        {!user.isLogged && (
          <Link to="/login">
            <Key className={s.header_icon} />
            Увійти
          </Link>
        )}
        {user.isAdmin && (
          <Link to="/admin">
            <Cogs className={s.header_icon} />
            Адмін
          </Link>
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foundProducts: state.products.filtered,
    searchValue: state.products.searchValue,
    user: state.profile,
    numberInCart: state.cart.all?.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductsByValue: (value) =>
      dispatch(filterProductsAction(null, value)),
    setSearchValue: (value) => dispatch(setSearchValueAction(value)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
