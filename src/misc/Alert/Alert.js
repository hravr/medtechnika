import React from "react";
import s from "./Alert.module.css";
import { connect } from "react-redux";
import classnames from "classnames";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as TimesCircle } from "../../assets/times-circle.svg";

const Alert = ({ content, isVisible, type = "error" }) => {
  return (
    <div
      className={classnames(s.container, {
        [s.active]: isVisible,
        [s.error]: type === "error",
        [s.warning]: type === "warning",
        [s.success]: type === "success",
      })}
    >
      <FixedWrapper>
        <div className={s.inner}>
          {type !== "error" ? (
            <Check className={s.icon} />
          ) : (
            <TimesCircle className={s.icon} />
          )}
          <p className={s.content}>{content}</p>
        </div>
      </FixedWrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    content: state.alert.content,
    isVisible: state.alert.isVisible,
    type: state.alert.type,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
