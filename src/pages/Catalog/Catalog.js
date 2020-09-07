import React, { useState, useRef, useEffect } from "react";
import s from "./Catalog.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import ReactPaginate from "react-paginate";
import HorizontalProductCard from "../../misc/HorizontalProductCard/HorizontalProductCard";
import {
  getProductsByPage,
  filterProductsAction,
  getCategoriesAction,
  getProducts,
  clearFilterAction,
  getRecommendedProductsAction,
} from "../../store/actions/productsActions";
import ProductCard from "../../misc/ProductCard/ProductCard";
import { scrollToRef } from "../../utils/utils";
import Button from "../../misc/Button/Button";
import Select from "../../misc/Select/Select";
import ItemsCarousel from "../../wrappers/ItemsCarousel/ItemsCarousel";
import { setLoadingAction } from "../../store/actions/baseActions";
import CategoryAccordion from "../../misc/CategoryAccordion/CategoryAccordion";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Th } from "../../assets/th-solid.svg";
import { ReactComponent as List } from "../../assets/list-solid.svg";

const sortSelectOption = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "priceMinus", label: "За ціною, від меншої до більшої" },
  { value: "price", label: "За ціною, від більшої до меншої" },
];

const Catalog = ({
  filteredProducts,
  filteredProductsQuantity,
  getProductsByPage,
  recommendedProducts,
  filterProducts,
  isLoading,
  getCategories,
  categories,
  searchValue,
  clearFilter,
  products,
  getRecommendedProducts,
}) => {
  const [productViewType, setProductViewType] = useState("row");
  const [sortType, setSortType] = useState(sortSelectOption[0]);
  const containerRef = useRef();
  const [sortedCategories, setSortedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterAnimation, setFilterAnimation] = useState(true);
  const [activePage, setActivePage] = useState(1);

  const onPageChange = ({ selected }) => {
    setActivePage(selected + 1);
    scrollToRef(containerRef);
  };

  const onSortTypeChange = (value) => {
    setSortType(value);
  };

  const selectCategory = (categoryTitle, categoryId) => {
    setSelectedCategories((prev) => [
      ...prev,
      { name: categoryTitle, id: categoryId },
    ]);
  };

  const removeCategory = (categoryTitle) => {
    const filtered = selectedCategories.filter(
      (selectedCategory) => selectedCategory.name !== categoryTitle
    );

    setSelectedCategories(filtered);
    if (!filtered?.length) {
      clearFilter(products);
    }
  };

  const switchProductViewType = () => {
    setProductViewType((prev) => (prev === "row" ? "column" : "row"));
  };

  useEffect(() => {
    filterProducts(selectedCategories, searchValue, activePage, sortType.value);
  }, [activePage, sortType, selectedCategories]);

  useEffect(() => {
    let filtered = categories.map((category) => {
      const categoryCopy = { ...category };
      return !category.parent.length && !category.sub.length
        ? { ...categoryCopy, subchilds: [], childs: {} }
        : null;
    });

    filtered = filtered.filter((el) => !!el);

    categories.forEach((category) => {
      if (category.parent.length && !category.sub.length) {
        Object.keys(filtered).forEach((key) => {
          if (filtered[key]._id === category.parent[0]._id) {
            filtered[key].subchilds = [...filtered[key].subchilds, category];
          }
        });
      }
    });
    Object.keys(filtered).forEach((key) => {
      const parent = filtered[key];
      parent.subchilds.forEach((subchild) => {
        categories.forEach((category, i) => {
          if (category.sub.length) {
            if (subchild._id === category.sub[0]._id) {
              let childKey = parent.childs[subchild._id];
              childKey = parent.childs[subchild._id] || [];
              parent.childs = {
                ...parent.childs,
                [subchild._id]: [...childKey, category],
              };
            }
          }
        });
      });
    });
    setSortedCategories(filtered);
  }, [categories]);

  const isEmptyResults = !filteredProducts.length && !isLoading;

  /*
  array.map((el) => (
    <div className = {el.id === "x" ? "lyaps" : "chinanen"}>
    </div>
  ))
  */

  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Каталог", path: "/catalog" },
  ];

  useEffect(() => {
    if (!categories?.length) {
      getCategories();
    }
    if (!recommendedProducts?.length) {
      getRecommendedProducts();
    }
  }, []);

  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Товари</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.container} ref={containerRef}>
          <div className={s.filter__container}>
            <div className={s.filter__body}>
              <h3
                className={s.filter__title}
                onClick={() => setFilterAnimation((prev) => !prev)}
              >
                Фільтр
              </h3>
              {window.innerWidth >= 600 ? (
                <div className={s.filter__categories}>
                  {!!sortedCategories?.length &&
                    sortedCategories.map((parent) => (
                      <CategoryAccordion
                        {...{ selectCategory }}
                        {...{ removeCategory }}
                        {...{ selectedCategories }}
                        {...{ parent }}
                        key={parent._id}
                      />
                    ))}
                </div>
              ) : (
                <CSSTransition
                  in={isFilterAnimation}
                  timeout={600}
                  classNames={{
                    exitActive: s.filter__exiting,
                    exitDone: s.filter__exited,
                    enterActive: s.filter__entering,
                    enterDone: s.filter__entered,
                  }}
                >
                  <div className={s.filter__categories}>
                    {sortedCategories.map((parent) => (
                      <CategoryAccordion
                        {...{ selectCategory }}
                        {...{ removeCategory }}
                        {...{ selectedCategories }}
                        {...{ parent }}
                        key={parent._id}
                      />
                    ))}
                  </div>
                </CSSTransition>
              )}
            </div>
          </div>
          <div className={s.main__content}>
            <div className={s.actions__container}>
              <div className={s.change__view__container}>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    className={s.view__button}
                    isSecondary={productViewType === "column"}
                  >
                    <Th className={s.view__icon} />
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={switchProductViewType}
                    className={s.view__button}
                    isSecondary={productViewType === "row"}
                  >
                    <List className={s.view__icon} />
                  </Button>
                </div>
              </div>
              <div className={s.sort__container}>
                <span>Тип сортування</span>
                <Select
                  onSelect={onSortTypeChange}
                  value={sortType.label}
                  options={sortSelectOption}
                />
              </div>
            </div>
            <div className={s.products}>
              {!!filteredProducts &&
                filteredProducts.map((product, i) =>
                  productViewType === "row" ? (
                    <ProductCard
                      className={s.product__card}
                      key={product._id}
                      {...{ product }}
                    />
                  ) : (
                    <HorizontalProductCard {...{ product }} key={product._id} />
                  )
                )}
            </div>
            {isEmptyResults && (
              <h2 className={s.empty__result__msg}>
                Нажаль товарів за вашим запитом не знайдено.
              </h2>
            )}
            {isEmptyResults && (
              <div className={s.carousel__container}>
                <ItemsCarousel
                  arrows
                  slidesPerPage={Math.floor(window.innerWidth / 550)}
                >
                  {recommendedProducts.map((product, i) => (
                    <ProductCard {...{ product }} key={product._id} />
                  ))}
                </ItemsCarousel>
              </div>
            )}
          </div>
        </div>
        <ReactPaginate
          pageCount={Math.round(filteredProductsQuantity / 24)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          {...{ onPageChange }}
          containerClassName={s.pagination__container}
          activeClassName={s.pagination__active__link}
          previousLabel=""
          nextLabel=""
          pageClassName={s.pagination__link}
        />
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredProducts: state.products.filtered,
    filteredProductsQuantity: state.products.filteredQuantity,
    recommendedProducts: state.products.recommended,
    isLoading: state.base.isLoading,
    categories: state.products.categories,
    searchValue: state.products.searchValue,
    products: state.products.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByPage: (page, categoryId, searchValue) =>
      dispatch(getProductsByPage(page, categoryId, searchValue)),
    filterProducts: (categoryId, searchValue, page, sortType) =>
      dispatch(filterProductsAction(categoryId, searchValue, page, sortType)),
    setLoading: (isLoading) => dispatch(setLoadingAction(isLoading)),
    getCategories: () => dispatch(getCategoriesAction()),
    clearFilter: (products) => dispatch(clearFilterAction(products)),
    getRecommendedProducts: () => dispatch(getRecommendedProductsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
