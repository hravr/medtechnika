import React, { useEffect } from "react";
import s from "./SingleNews.module.css";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import NewsCard from "../../misc/NewsCard/NewsCard";
import { getSingleNewsAction } from "../../store/actions/newsActions";
import { connect } from "react-redux";
import { ReactComponent as Home } from "../../assets/home.svg";

const SingleNews = ({ recentNews, getSingleNews, match, singleNews }) => {
  const { title, gallery, desc, createdAt, _id } = singleNews;
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Новина", path: "/single-news/:id" },
  ];
  useEffect(() => {
    if (match.params?.id) {
      getSingleNews(match.params.id);
    }
  }, [match.params?.id]);

  return (
    !!_id && (
      <div>
        <div className={s.title__container}>
          <h4 className={s.title}>{title}</h4>
          <BreadCrumbs items={breadCrumbsItems} />
        </div>
        <FixedWrapper>
          <div className={s.single_new}>
            <div className={s.main_container}>
              <h4 className={s.news_title}>{title}</h4>
              <div className={s.image_container}>
                <img
                  className={s.main__image}
                  src={
                    gallery || require("../../assets/image-placeholder.webp")
                  }
                  alt="loading"
                />
              </div>
              <div className={s.news_text}>
                <p>{desc}</p>
              </div>
              {/* <Moment format="DD/MM/YYYY" className={s.createdAt}> */}
              {/* {new Date(createdAt).toISOString().split("T")[0]} */}

              {createdAt.split("T")[0]}
              {/* </Moment> */}
            </div>
          </div>
          <div className={s.section}>
            <h3 className={s.section__title}>Популярні новини</h3>
            <div className={s.news__container}>
              {recentNews.slice(0, 3).map((newsItem, i) => (
                <NewsCard {...{ newsItem }} key={newsItem._id} />
              ))}
            </div>
          </div>
        </FixedWrapper>
      </div>
    )
  );
};
const mapStateToProps = (state) => {
  return {
    recentNews: state.news.recent,
    singleNews: state.news.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleNews: (id) => dispatch(getSingleNewsAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleNews);
