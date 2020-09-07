import React, { useState } from "react";
import s from "./EditOrder.module.css";
import FixedWrapper from "../../../../wrappers/FixedWrapper/FixedWrapper";
import ProfileInput from "../../../../misc/Inputs/ProfileInput/ProfileInput";
import Button from "../../../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import Select from "../../../../misc/Select/Select";
import GoBackBtn from "../../../../misc/GoBackBtn/GoBackBtn";
import BreadCrumbs from "../../../../misc/BreadCrumbs/BreadCrumbs";

const EditOrder = () => {
  const h = useHistory();
  const statusOptions = [
    { value: "wait", label: "Очікує оплати" },
    { value: "done", label: "Завершено" },
    { value: "esc", label: "Скасовано" },
    { value: "sent", label: "Відправлено" },
  ];
  const deliveryOptions = [
    { value: "self-pickup", label: "Самовивіз" },
    { value: "np", label: "Нова пошта" },
    { value: "up", label: "Укр пошта" },
  ];
  const payOptions = [
    { value: "cash", label: "Наложений платіж" },
    { value: "card", label: "Картою" },
  ];

  const [sortStatusType, setSortStatusType] = useState(statusOptions[0]);
  const [sortDeliveryType, setSortDeliveryType] = useState(deliveryOptions[0]);
  const [sortPayType, setPayType] = useState(payOptions[0]);

  const onSortStatusChange = (value) => {
    setSortStatusType(value);
  };
  const onSortDeliveryChange = (value) => {
    setSortDeliveryType(value);
  };
  const onSortPayChange = (value) => {
    setPayType(value);
  };
  const breadCrumbsItems = [
    {
      name: "Адмін",
      path: "/admin",
    },
    { name: "Редагувати замовлення" },
  ];

  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>Редагування замовлення</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.body}>
          <div className={s.input__container}>
            <ProfileInput className={s.input} label="Номер замовлення" />
            <ProfileInput className={s.input} label="Дата створення" />
            <div className={s.select__container}>
              <span className={s.label}>Статус</span>
              <Select
                onSelect={onSortStatusChange}
                value={sortStatusType.label}
                options={statusOptions}
                className={s.selector}
              />
            </div>
            <div className={s.select__container}>
              <span className={s.label}>Спосіб оплати</span>
              <Select
                className={s.selector}
                onSelect={onSortPayChange}
                value={sortPayType.label}
                options={payOptions}
              />
            </div>
            <div className={s.select__container}>
              <span className={s.label}>Спосіб доставки</span>
              <Select
                className={s.selector}
                onSelect={onSortDeliveryChange}
                value={sortDeliveryType.label}
                options={deliveryOptions}
              />
            </div>
            <ProfileInput className={s.input} label="Загальна сума" />
          </div>
          <Button title="Змінити" />
          <GoBackBtn />
        </div>
      </FixedWrapper>
    </div>
  );
};

export default EditOrder;
