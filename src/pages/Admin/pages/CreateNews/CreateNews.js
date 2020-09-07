import React, { useRef } from "react";
import s from "./CreateNews.module.css";
import { connect } from "react-redux";
import Input from "../../../../misc/Inputs/Input/Input";
import Button from "../../../../misc/Button/Button";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import { Formik } from "formik";
import { createNewsAction } from "../../../../store/actions/adminActions";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";
import { showAlertAction } from "../../../../store/actions/alertActions";
import { ReactComponent as Times } from "../../../../assets/times.svg";

const CreateNews = ({ createNews, showAlert }) => {
  const uploadInputRef = useRef();
  const handleImages = ({ target: { files } }, values, setValues) => {
    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      setValues({
        ...values,
        gallery: result,
        galleryFile: files[0],
      });
    };
    reader.readAsDataURL(files[0]);
  };

  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Створити новину" },
  ];

  return (
    <div>
      <div className={s.container}>
        <div className={s.title__container}>
          <h1 className={s.title}>Створення новини</h1>
          <BreadCrumbs items={breadCrumbsItems} />
        </div>
        <FixedWrapper>
          <Formik
            initialValues={{
              title: "",
              desc: "",
              gallery: "",
              galleryFile: {},
            }}
            onSubmit={async (
              { title, desc, gallery, galleryFile },
              { resetForm }
            ) => {
              const imageFormData = new FormData();
              imageFormData.append("gallery", galleryFile);
              const isNewsCreated = await createNews(
                { title, desc },
                imageFormData
              );
              if (isNewsCreated) {
                showAlert("Новину створено успішно!", "success");
              } else {
                showAlert("Сталась помилка!", "error");
              }
              resetForm({ title: "", desc: "", gallery: "", galleryFile: {} });
            }}
          >
            {({ values, handleChange, setValues, handleSubmit }) => (
              <form className={s.body}>
                <Input
                  label="Назва"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                  containerClass={s.input__container}
                />
                <div className={s.input__container}>
                  <p className={s.label}>Фото</p>
                  <div className={s.images__container}>
                    {values.gallery && (
                      <div className={s.image__container}>
                        <Times
                          className={s.delete__icon}
                          onClick={() => {
                            uploadInputRef.current.value = null;
                            setValues({ ...values, gallery: "" });
                          }}
                        />
                        <img
                          className={s.image}
                          src={values.gallery}
                          alt="loading"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="gallery"
                    ref={uploadInputRef}
                    onChange={(e) => handleImages(e, values, setValues)}
                  />
                </div>
                <Input
                  label="Опис"
                  value={values.desc}
                  name="desc"
                  onChange={handleChange}
                  containerClass={s.input__container}
                  isTextarea
                />
                <div className={s.submit__container}>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    title="Створити"
                    size="lg"
                  />
                </div>
                <GoBackBtn />
              </form>
            )}
          </Formik>
        </FixedWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    createNews: (news, gallery) => dispatch(createNewsAction(news, gallery)),
    showAlert: (content, type) => dispatch(showAlertAction(content, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews);
