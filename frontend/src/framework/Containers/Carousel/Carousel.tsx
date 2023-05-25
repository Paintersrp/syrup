import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { Icon } from "../../Base";

interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayDuration?: number;
  style?: React.CSSProperties;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay = true,
  autoplayDuration = 3000,
  style,
  className,
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
    <div className={`carousel-container ${className}`} style={style}>
      <div className="carousel">
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
          <Icon icon={faChevronLeft} color="#fff" />
        </button>
        <button className="next-button" onClick={handleNextSlide}>
          <Icon icon={faChevronRight} color="#fff" />
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
            <Icon icon={faPause} color="#fff" />
          ) : (
            <Icon icon={faPlay} color="#fff" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
