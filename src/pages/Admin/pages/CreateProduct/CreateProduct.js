import React, { useState, useRef, useEffect, useMemo } from "react";
import s from "./CreateProduct.module.css";
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
} from "../../../../store/actions/adminActions";
import Cartesian from "react-cartesian";
import OrderAttributeOptions from "../../../../misc/Admin/OrderAttributeOptions/OrderAttributeOptions";
import { showAlertAction } from "../../../../store/actions/alertActions";
import Resizer from "react-image-file-resizer";
import { ReactComponent as Times } from "../../../../assets/times.svg";

const CreateProduct = ({
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
}) => {
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleImages = ({ target: { files } }) => {
    const temp = [];

    Array.from(files).forEach((file, i) => {
      const reader = new FileReader();

      reader.onload = async ({ target: { result } }) => {
        if (i === 0) {
          const output = await Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              setValues({
                ...values,
                gallery: temp,
                galleryFiles: Array.from(files),
                thumbnail: uri,
              });
            },
            "blob"
          );
        }
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

  const onCategoryInputChange = (value) => {
    const filtered = categories.filter((category) =>
      category.title.trim().toLowerCase().startsWith(value.trim().toLowerCase())
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

  const onAttributeInputChange = (value) => {
    const filtered = attributes.filter((attribute) =>
      attribute.name.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
    setFilteredAttributes(filtered);
  };

  const onAttributeValueChange = (value, id, index, name) => {
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

  const onVendorInputChange = (value) => {
    const filtered = vendors.filter((vendor) =>
      vendor.title.trim().toLowerCase().startsWith(value.trim().toLowerCase())
    );
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
            value={values.vendor}
            withSearch
            noDefaultValue
            onSelect={onVendorSelect}
            onSearchValueChange={onVendorInputChange}
            options={vendorsOptions}
            containerClass={s.input__container}
          />
          <Select
            label="Категорія"
            value={values.category}
            withSearch
            noDefaultValue
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
                return (
                  <div key={_id} className={s.attribute}>
                    <p>{name}</p>
                    <div>
                      {[
                        ...Array(values.attributes[name].length + 1).keys(),
                      ].map((number) => (
                        <Input
                          placeholder="Значення атрибута"
                          key={_id + number}
                          onChange={({ target }) =>
                            onAttributeValueChange(
                              target.value,
                              _id,
                              number,
                              name
                            )
                          }
                        />
                      ))}
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
            <Button onClick={handleSubmit} title="Створити" size="lg" />
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
    vendor: "",
    article: "",
    quantity: 1,
    recommended: false,
    attributesLabels: [],
    attrOptions: [],
    attributes: {},
    isPriceChanges: false,
    thumbnail: {},
  }),
  handleSubmit: async (
    val,
    { props: { createProduct, showAlert }, resetForm }
  ) => {
    const productToSubmit = {
      title: val.title,
      desc: val.desc,
      attr: val.attributesLabels.map((label) => label.name),
      attrOptions: val.attrOptions,
      vendorID: val?.vendor?._id,
      categoryID: val?.category?._id,
      price: val.price,
      article: val.article,
      recommended: val.recommended,
      quantity: val.quantity,
      visibility: true,
      reviews: [],
    };

    let galleryFormData = null;
    let thumbnailFormData = null;
    if (val.galleryFiles.length) {
      galleryFormData = new FormData();
      val.galleryFiles.forEach((image) => {
        galleryFormData.append("gallery", image);
      });
      thumbnailFormData = new FormData();
      thumbnailFormData.append("gallery", val.thumbnail);
    }

    const isSuccess = await createProduct(
      productToSubmit,
      galleryFormData,
      thumbnailFormData
    );

    if (isSuccess) {
      resetForm({
        title: "",
        desc: "",
        gallery: [],
        galleryFiles: [],
        price: "",
        vendor: "",
        article: "",
        quantity: 1,
        recommended: false,
        attributesLabels: [],
        attrOptions: [],
        attributes: {},
        isPriceChanges: false,
      });
      showAlert("Товар створено успішно", "success");
    } else {
      showAlert("Сталась помилка при створенні товару");
    }
  },
})(CreateProduct);

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    vendors: state.admin.vendors,
    attributes: state.admin.attributes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesAction()),
    getVendors: () => dispatch(getVendorsAction()),
    getAttributes: () => dispatch(getAttributesAction()),
    createProduct: (product, gallery, thumbnail) =>
      dispatch(createProductAction(product, gallery, thumbnail)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
