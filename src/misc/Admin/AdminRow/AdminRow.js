import React, { useState } from "react";
import s from "./AdminRow.module.css";
import Button from "../../Button/Button";
import classnames from "classnames";

const AdminRow = ({
  onEdit,
  onDelete,
  items,
  className,
  onClick = () => {},
  isExpanding,
  children,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const clickHandler = (e) => {
    setExpanded((prev) => !prev);
    onClick(e);
  };
  return (
    <div>
      <div className={classnames(s.card, className)} onClick={clickHandler}>
        <div className={s.card__atrbutes}>
          {items.map(({ title, key }, i) => (
            <div {...{ key }}>
              <p
                className={classnames(s.card__title, {
                  [s.card__title__expanded]: isExpanded,
                })}
              >
                {title}
              </p>
            </div>
          ))}
          <div className={s.table__container}>
            <div className={s.buttons}>
              {!!onEdit && (
                <Button
                  className={s.edit__btn}
                  onClick={onEdit}
                  size="sm"
                  title="Редагувати"
                />
              )}
              {!!onDelete && (
                <div className={s.delete__container}>
                  <Button
                    size="sm"
                    onClick={onDelete}
                    title="Видалити"
                    className={s.delete__btn}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isExpanded && children}
    </div>
  );
};

export default AdminRow;
