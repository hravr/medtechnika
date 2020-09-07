import React, { useState, useEffect } from "react";
import s from "./Carousel.module.css";
import { Transition } from "react-transition-group";
import { ReactComponent as ChevronLeft } from "../../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";

const Carousel = ({ images, className, children }) => {
  const [activeImageId, setActiveImageId] = useState(0);
  const [isAnimation, setAnimation] = useState(false);

  const setNextImage = () => {
    setActiveImageId((prev) => (prev + 1 < images.length ? prev + 1 : 0));
  };
  const setPreviousImage = () => {
    setActiveImageId((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    setAnimation((prev) => !prev);
  }, [activeImageId]);

  return (
    <div className={`${s.container} ${className}`}>
      <Transition in={isAnimation} timeout={400}>
        {(state) => {
          const transitionStyle = {
            entering: { opacity: 0.7 },
            entered: { opacity: 1 },
            exiting: { opacity: 0.7 },
            exited: { opacity: 1 },
          };
          return (
            <img
              className={s.main__image}
              src={images[activeImageId]}
              alt="loading"
              style={transitionStyle[state]}
            />
          );
        }}
      </Transition>

      <ChevronLeft
        onClick={setNextImage}
        className={`${s.switch__button} ${s.switch__button__left}`}
      />
      <ChevronRight
        onClick={setPreviousImage}
        className={`${s.switch__button} ${s.switch__button__right}`}
      />
      {children}
    </div>
  );
};

export default Carousel;
