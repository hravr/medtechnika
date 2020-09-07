import React, { useRef, useEffect, useState } from "react";
import s from "./EditNews.module.css";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import Button from "../../../../misc/Button/Button";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleNewsAction } from "../../../../store/actions/newsActions";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import { withFormik } from "formik";
import Input from "../../../../misc/Inputs/Input/Input";
import { editNewsAction } from "../../../../store/actions/adminActions";
import { showAlertAction } from "../../../../store/actions/alertActions";

const EditNews = ({
  getSingleNews,
  singleNews,
  values,
  setValues,
  handleChange,
  handleSubmit,
}) => {
  const { id } = useParams();

  const uploadedImage = useRef(null);

  const imageUploader = useRef(null);

  useEffect(() => {
    getSingleNews(id);
  }, []);

  useEffect(() => {
    const { desc, title, gallery, _id } = singleNews;
    if (singleNews._id) {
      setValues({
        ...values,
        desc,
        title,
        gallery,
        _id,
      });
    }
  }, [singleNews]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = ({ target: { result } }) => {
        current.src = result;
        setValues({ ...values, gallery: result, galleryFile: file });
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
    { name: "Редагувати новину" },
  ];
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування новини</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.input__container}>
          <div className={s.title__input}>
            <Input
              label="Заголовок"
              value={values.title}
              name="title"
              className={s.input}
              onChange={handleChange}
            />
          </div>
          <div className={s.image__input}>
            <span className={s.label}>Натисніть на фото, щоб обрати нове</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              className={s.input__image}
            />
            <div
              className={s.upload__image}
              onClick={() => imageUploader.current.click()}
            >
              {/* <button
                className={s.delete__photo}
                onClick={handleRemovePhoto}
                title="Видалити фотографію"
              >
                x
              </button> */}
              <img
                alt="loading"
                ref={uploadedImage}
                src={values.gallery}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div className={s.news__content}>
            <Input
              isTextarea
              label="Текст новини"
              name="desc"
              className={s.textarea}
              onChange={handleChange}
              value={values.desc}
            />
          </div>
          <Button title="Зберегти зміни" type="submit" onClick={handleSubmit} />
          <GoBackBtn />
        </div>
      </FixedWrapper>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    title: "",
    desc: "",
    gallery: "",
    galleryFile: {},
    _id: "",
  }),
  handleSubmit: async (values, { props: { editNews, showAlert } }) => {
    const { title, desc, gallery, galleryFile, _id } = values;
    const imageFormData = new FormData();

    imageFormData.append("gallery", galleryFile);

    const isNewsCreated = await editNews({ title, desc }, _id, imageFormData);

    if (isNewsCreated) {
      showAlert("Новину створено успішно!", "success");
    } else {
      showAlert("Сталась помилка!", "error");
    }
  },
})(EditNews);

const mapStateToProps = (state) => {
  return {
    singleNews: state.news.single,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleNews: (id) => dispatch(getSingleNewsAction(id)),
    editNews: (news, id, image) => dispatch(editNewsAction(news, id, image)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
