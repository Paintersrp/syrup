import React, { useState, useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { Icon } from "../../../Components";
import Base, { BaseProps } from "../../Base/Base";

interface CarouselProps extends BaseProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayDuration?: number;
  style?: React.CSSProperties;
  className?: string;
  iconColor?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay = true,
  autoplayDuration = 3000,
  style,
  className,
  iconColor = "#fff",
  ...rest
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState<boolean>(autoplay);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? children.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === children.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleAutoplayToggle = () => {
    setAutoplayEnabled((prevValue) => !prevValue);
  };

  useEffect(() => {
    let autoplayTimer: number;

    if (autoplayEnabled) {
      autoplayTimer = window.setInterval(() => {
        handleNextSlide();
      }, autoplayDuration);
    }

    return () => {
      clearInterval(autoplayTimer);
    };
  }, [autoplayEnabled, autoplayDuration]);

  return (
    <Base className={`carousel-container ${className}`} {...rest}>
      <div className="carousel" style={style}>
        <div
          className="slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="slide">
              {child}
            </div>
          ))}
        </div>
        <button className="prev-button" onClick={handlePreviousSlide}>
          <Icon icon={faChevronLeft} color={iconColor} />
        </button>
        <button className="next-button" onClick={handleNextSlide}>
          <Icon icon={faChevronRight} color={iconColor} />
        </button>
        <div className="indicators">
          {children.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
        <button className="autoplay-toggle" onClick={handleAutoplayToggle}>
          {autoplayEnabled ? (
            <Icon icon={faPause} color={iconColor} />
          ) : (
            <Icon icon={faPlay} color={iconColor} />
          )}
        </button>
      </div>
    </Base>
  );
};

export default Carousel;
