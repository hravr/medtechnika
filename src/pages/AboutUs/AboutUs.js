import React from "react";
import s from "./AboutUs.module.css";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import logo from "../../assets/logo.png";
import { ReactComponent as Home } from "../../assets/home.svg";

const AboutUs = (props) => {
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <Home className={s.bread__crumbs} />,
    },
    { name: "Про нас", path: "/about-us" },
  ];
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Про нас</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.single_new}>
          <div className={s.main_container}>
            <h4 className={s.news_title}>Медтехніка</h4>
            <div className={s.image_container}>
              <img className={s.main__image} src={logo} alt="loading" />
            </div>
            <div className={s.news_text}>
              <p>
                Наш магазин працює на ринку України вже більше 10 років. Ми
                пропонуюємо Вам широкий і якісний вибір товарів медичного
                призначення. Всі товари, представлені на сайті Ви можете
                побачити в нашому магазині. Доставка всіх товарів здійснюється
                як по Тернополі (наша кур'єрська служба), так і по всій Україні
                (компанії перевізники). Ми займаємося не тільки роздрібною
                торгівлею але і оптовими поставками. Ви можете зв'язатися з нами
                та ми будемо раді відповісти на Ваші запитання.
              </p>
            </div>
            {/* <Moment format="DD/MM/YYYY" className={s.createdAt}>
              {createdAt}
            </Moment> */}
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};

export default AboutUs;
