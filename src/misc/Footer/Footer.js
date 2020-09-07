import React from "react";
import s from "./Footer.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { Link } from "react-router-dom";
import { ReactComponent as Phone } from "../../assets/phone.svg";
import { ReactComponent as Instagram } from "../../assets/instagram.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as Clock } from "../../assets/clock.svg";
import { ReactComponent as Copyright } from "../../assets/copyright.svg";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <FixedWrapper>
        <div className={s.a}>
          <div className={s.contact}>
            <h4>Зв'язатися з нами</h4>
            <div className={s.row}>
              <Phone className={s.icon_ft} />
              <span className={s.phone}>+ 38 (067) 208 81 45</span>
            </div>
            <div className={s.row}>
              <Instagram className={s.icon_ft} />
              <span className={s.social}>Instagram</span>
            </div>
            <div className={s.row}>
              <Facebook className={s.icon_ft} />
              <span className={s.social}>Facebook</span>
            </div>
            <div className={s.row}>
              <Clock className={s.icon_ft} />
              <div className={s.hours__container}>
                <p className={s.hours}>Пн-Пт: 09:00 - 19:00</p>
                <p className={s.hours}> Сб-Нд: 10:00 -17:00</p>
              </div>
            </div>
          </div>
          <div className={s.navigation}>
            <h4>Навігація по сайту</h4>
            <button>
              <Link to="/" className={s.btn_cl}>
                <p>Головна</p>
              </Link>
            </button>
            <button>
              <Link to="/about-us" className={s.btn_cl}>
                <p>Про нас</p>
              </Link>
            </button>
            <button>
              <Link to="/news" className={s.btn_cl}>
                <p>Новини</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Контакти</p>
              </Link>
            </button>
          </div>
          <div className={s.inf}>
            <h4>Корисна інформація</h4>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Доставка і оплата</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Часті запитання</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Гарантія і повернення</p>
              </Link>
            </button>
            <button>
              <Link to="/public-offer" className={s.btn_cl}>
                <p>Про бонус систему</p>
              </Link>
            </button>
            <button>
              <Link to="/politics" className={s.btn_cl}>
                <p>Політика конфіденційності </p>
              </Link>
            </button>
          </div>
        </div>
        <div className={s.copyright}>
          <Copyright className={s.icon_ft} /> 1999-2020. Всі права захищені
        </div>
      </FixedWrapper>
    </footer>
  );
};

export default Footer;
