import React, { useEffect } from "react";
import s from "./News.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { connect } from "react-redux";
import NewsCard from "../../misc/NewsCard/NewsCard";
import { getAllNewsAction } from "../../store/actions/newsActions";
import { ReactComponent as Home } from "../../assets/home.svg";

const News = ({ recentNews, getNews }) => {
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Новини", path: "/news" },
  ];
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Новини</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.section}>
          {/* <h3 className={s.section__title}>Новини</h3> */}
          <div className={s.news__container}>
            {recentNews.map((newsItem, i) => (
              <NewsCard {...{ newsItem }} key={newsItem._id} />
            ))}
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    recentNews: state.news.recent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () => dispatch(getAllNewsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
