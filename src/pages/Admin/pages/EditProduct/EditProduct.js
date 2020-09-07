import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./EditProduct.module.css";
import { connect } from "react-redux";
import Select from "../../../../misc/Select/Select";
import Input from "../../../../misc/Inputs/Input/Input";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../../../misc/Button/Button";
import { Formik, withFormik } from "formik";
import { getCategoriesAction } from "../../../../store/actions/productsActions";
import {
  getVendorsAction,
  getAttributesAction,
  createProductAction,
  editProductAction,
} from "../../../../store/actions/adminActions";
import Cartesian from "react-cartesian";
import OrderAttributeOptions from "../../../../misc/Admin/OrderAttributeOptions/OrderAttributeOptions";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../../../store/api/api";
import { getSingleProductAction } from "../../../../store/actions/singleProductActions";
import uuid from "react-uuid";
import { showAlertAction } from "../../../../store/actions/alertActions";
import { ReactComponent as Times } from "../../../../assets/times.svg";

const EditProduct = ({
  getAttributes,
  getCategories,
  getVendors,
  categories,
  vendors,
  attributes,
  handleChange,
  handleSubmit,
  values,
  setValues,
  getProduct,
  product,
}) => {
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleImages = ({ target: { files } }) => {
    const temp = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        temp.push(result);
        setValues({
          ...values,
          gallery: temp,
          galleryFiles: Array.from(files),
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const onCategorySelect = ({ value }) => {
    setValues({ ...values, category: value });
  };

  const onCategoryInputChange = (value = "") => {
    const filtered = categories.filter(
      (category) =>
        category.title ||
        "".trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const onAttributeSelect = ({ value }) => {
    const isValueAlreadyExist = !!values.attributesLabels.filter(
      (attribute) => attribute._id === value._id
    ).length;
    if (!isValueAlreadyExist) {
      setValues({
        ...values,
        attributesLabels: [...values.attributesLabels, value],
        attributes: { ...values.attributes, [value.name]: [] },
      });
    }
  };

  const onAttributeInputChange = (value = "") => {
    const filtered = attributes.filter((attribute) =>
      attribute.name.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredAttributes(filtered);
  };

  const onAttributeValueChange = (value = "", id, index, name) => {
    const temp = [...values.attributes[name]];
    temp[index] = value;
    setValues({
      ...values,
      attributes: {
        ...values.attributes,
        [name]: temp,
      },
    });
  };

  const setAttrOptions = (attrOptions) => {
    setValues({ ...values, attrOptions });
  };

  const onAttributesCheckboxChange = (e) => {
    setValues({
      ...values,
      isPriceChangesByAttributes: !values.isPriceChangesByAttributes,
    });
  };

  const onVendorSelect = ({ value }) => {
    setValues({ ...values, vendor: value });
  };

  const onVendorInputChange = (value = "") => {
    const filtered = vendors.filter((vendor) => {
      return vendor.title
        .trim()
        .toLowerCase()
        .startsWith(value.trim().toLowerCase());
    });
    setFilteredVendors(filtered);
  };

  const deleteImage = (imageToDelete) => {
    const filteredGallery = values.gallery.filter(
      (image) => image !== imageToDelete
    );
    setValues({ ...values, gallery: filteredGallery });
  };

  const vendorsOptions = useMemo(() => {
    return filteredVendors.map((vendor) => ({
      label: vendor.title,
      value: vendor,
    }));
  }, [filteredVendors]);

  const categoriesOptions = useMemo(() => {
    return filteredCategories.map((category) => ({
      label: category.title,
      value: category,
    }));
  }, [filteredCategories]);

  const attributesOptions = useMemo(() => {
    return filteredAttributes.map((attribute) => ({
      label: attribute.name,
      value: attribute,
    }));
  }, [filteredAttributes]);

  const { id } = useParams();

  useEffect(() => {
    if (!vendors.length) {
      getAttributes();
      getCategories();
      getVendors();
    }
  }, []);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    setFilteredAttributes(attributes);
  }, [attributes]);

  useEffect(() => {
    getProduct(id);
  }, []);

  useEffect(() => {
    if (!product) {
      return;
    }

    const tempAttributes = {};
    const tempAttributesLabels = [];

    product.attrOptions.forEach((option) => {
      Object.keys(option).forEach((key) => {
        if (key === "_id" || key === "priceAttr") return;
        if (!tempAttributes[key]) {
          tempAttributes[key] = [];
        }
        if (!tempAttributes[key].includes(option[key])) {
          tempAttributes[key].push(option[key]);
        }
        const isLabelAlreadyExist = !tempAttributesLabels.filter(
          (label) => label.name === key
        ).length;
        if (isLabelAlreadyExist) {
          tempAttributesLabels.push({ name: key, _id: uuid() });
        }
      });
    });

    setValues({
      ...values,
      title: product.title,
      desc: product.desc,
      attributes: tempAttributes,
      attributesLabels: tempAttributesLabels,
      attrOptions: product.attrOptions,
      vendor: product.vendorID,
      category: product.categoryID,
      price: product.price,
      article: product.article,
      recommended: product.recommended,
      quantity: product.quantity,
      visibility: product.visibility,
      reviews: product.reviews,
      _id: product._id,
    });
  }, [product]);

  return (
    <div className={s.container}>
      <div className={s.title__container}>
        <h1 className={s.title}>Створення товару</h1>
      </div>
      <FixedWrapper>
        <form className={s.body}>
          <Input
            label="Назва"
            value={values.title}
            name="title"
            placeholder="Стетоскоп"
            onChange={handleChange}
            containerClass={s.input__container}
          />
          <div className={s.input__container}>
            <p className={s.label}>Фото</p>
            <div className={s.images__container}>
              {values.gallery.map((image) => (
                <div className={s.image__container}>
                  <Times
                    className={s.delete__icon}
                    onClick={() => deleteImage(image, setValues, values)}
                  />
                  <img className={s.image} src={image} alt="loading" />
                </div>
              ))}
            </div>
            <input
              type="file"
              multiple
              onChange={(e) => handleImages(e, setValues, values)}
            />
          </div>
          <Input
            label="Опис"
            value={values.desc}
            name="desc"
            placeholder="Багатофункціональний високоякісний стетоскоп типу SPRAGUE RAPPAPORT."
            onChange={handleChange}
            containerClass={s.input__container}
            isTextarea
          />
          <Input
            label="Ціна"
            value={values.price}
            placeholder="123"
            name="price"
            onChange={handleChange}
            containerClass={s.input__container}
          />
          <Select
            label="Країна виробника"
            value={values?.vendor}
            withSearch
            defaultSearchValue={values.vendor?.title}
            onSelect={onVendorSelect}
            onSearchValueChange={onVendorInputChange}
            options={vendorsOptions}
            containerClass={s.input__container}
          />
          <Select
            label="Категорія"
            value={values.category}
            withSearch
            defaultSearchValue={values.category?.title}
            onSelect={onCategorySelect}
            onSearchValueChange={onCategoryInputChange}
            options={categoriesOptions}
            containerClass={s.input__container}
          />
          <Select
            label="Атрибути"
            value={values.attribute}
            withSearch
            noDefaultValue
            clearInputOnSelect
            onSelect={onAttributeSelect}
            onSearchValueChange={onAttributeInputChange}
            options={attributesOptions}
            containerClass={s.input__container}
          />
          {!!values.attributesLabels.length && (
            <div className={s.attributes__container}>
              <div className={s.attributes__checkbox__container}>
                <input
                  type="checkbox"
                  checked={values.isPriceChangesByAttributes}
                  className={s.attributes__checkbox}
                  onChange={onAttributesCheckboxChange}
                />
                <p
                  onClick={onAttributesCheckboxChange}
                  className={s.attributes__checkbox__label}
                >
                  Ціна продукту не залежить від обраних атрибутів
                </p>
              </div>
              {values.attributesLabels.map(({ _id, name }) => {
                const attributeValues = values.attributes[name];

                return (
                  <div key={_id} className={s.attribute}>
                    <p>{name}</p>
                    <div>
                      {[...Array(attributeValues.length + 1).keys()].map(
                        (number) => (
                          <Input
                            placeholder="Значення атрибута"
                            key={_id + number}
                            value={attributeValues[number]}
                            onChange={({ target }) =>
                              onAttributeValueChange(
                                target.value,
                                _id,
                                number,
                                name
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
              <OrderAttributeOptions
                {...{ setAttrOptions }}
                options={values.attributes}
                attrOptions={values.attrOptions}
              />
            </div>
          )}
          <Input
            label="Артикул"
            value={values.article}
            name="article"
            onChange={handleChange}
            containerClass={s.input__container}
          />
          <Input
            label="Кількість"
            value={values.quantity}
            name="quantity"
            onChange={handleChange}
            containerClass={s.input__container}
          />
          <div className={s.submit__container}>
            <Button onClick={handleSubmit} title="Змінити" size="lg" />
          </div>
        </form>
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    title: "",
    desc: "",
    gallery: [],
    galleryFiles: [],
    price: "",
    article: "",
    quantity: 1,
    recommended: false,
    attributesLabels: [],
    attrOptions: [],
    attributes: {},
    vendor: {},
    category: {},
    isPriceChanges: false,
    _id: "",
  }),
  handleSubmit: async (
    val,
    { props: { editProduct, showAlert }, resetForm }
  ) => {
    const productToSubmit = {
      title: val.title,
      desc: val.desc,
      attr: val.attributesLabels.map((label) => label.name),
      attrOptions: val.attrOptions,
      vendorID: val.vendor?._id,
      categoryID: val.category?._id,
      price: val.price,
      article: val.article,
      recommended: val.recommended,
      quantity: val.quantity,
      visibility: true,
      reviews: [],
    };

    let galleryFormData = null;
    if (val.galleryFiles.length) {
      galleryFormData = new FormData();
      val.galleryFiles.forEach((image) => {
        galleryFormData.append("gallery", image);
      });
    }

    const isSuccess = await editProduct(
      productToSubmit,
      galleryFormData,
      val._id
    );

    if (isSuccess) {
      showAlert("Товар змінено успішно!", "success");
    } else {
      showAlert("Сталась помилка!", "error");
    }

    resetForm({
      title: "",
      desc: "",
      gallery: [],
      galleryFiles: [],
      price: "",
      article: "",
      quantity: 1,
      recommended: false,
      attributesLabels: [],
      attrOptions: [],
      attributes: {},
      vendor: {},
      category: {},
      isPriceChanges: false,
      _id: "",
    });
  },
})(EditProduct);

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    vendors: state.admin.vendors,
    attributes: state.admin.attributes,
    product: state.single.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesAction()),
    getVendors: () => dispatch(getVendorsAction()),
    getAttributes: () => dispatch(getAttributesAction()),
    getProduct: (id) => dispatch(getSingleProductAction(id)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),

    editProduct: (product, gallery, id) =>
      dispatch(editProductAction(product, gallery, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
