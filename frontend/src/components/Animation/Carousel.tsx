import { FC, useState, useEffect, ReactNode, CSSProperties } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { Icon } from '../Media';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { mediaQueries } from '@/theme/common/breakpoints';

export const cx = {
  carousel: css({
    position: 'relative',
    overflow: 'hidden',
    width: 600,
    height: 400,
    borderRadius: 8,
    [mediaQueries.md]: {
      width: 360,
      height: 300,
    },
  }),
  slides: css({
    display: 'flex',
    width: '100%',
    transition: 'transform 0.3s ease',
  }),
  slide: css({
    flexShrink: 0,
    width: '100%',
    position: 'relative',
    zIndex: 1,
  }),
  slideContent: css({
    width: '100%',
    objectFit: 'cover',
  }),
  activeSlide: css({
    zIndex: 2,
  }),
  prevButton: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 24,
    zIndex: 3,
    left: 0,
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      transition: 'background-color 0.3s ease',
    },
    '& i': {
      pointerEvents: 'none',
    },
  }),
  nextButton: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 24,
    zIndex: 3,
    right: 0,
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      transition: 'background-color 0.3s ease',
    },
    '& i': {
      pointerEvents: 'none',
    },
  }),
  indicators: css({
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  }),
  indicator: css({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#fff',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&.activeSlide': {
      backgroundColor: 'var(--color-secondary-main)',
    },
  }),
  autoplayToggle: css({
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 20,
    zIndex: 3,
    '& i': {
      pointerEvents: 'none',
    },
  }),
};

interface CarouselProps extends BaseProps {
  children: ReactNode[];
  autoplay?: boolean;
  autoplayDuration?: number;
  style?: CSSProperties;
  className?: string;
  iconColor?: string;
}

export const Carousel: FC<CarouselProps> = ({
  children,
  autoplay = true,
  autoplayDuration = 3000,
  style,
  className,
  iconColor = '#fff',
  ...rest
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState<boolean>(autoplay);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? children.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === children.length - 1 ? 0 : prevSlide + 1));
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
    <Base d="flex" j="c" className={clsx(className)} {...rest}>
      <div css={cx.carousel} style={style}>
        <div css={cx.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {children.map((child, index) => (
            <div key={index} css={cx.slide}>
              {child}
            </div>
          ))}
        </div>
        <button css={cx.prevButton} onClick={handlePreviousSlide}>
          <Icon icon="chevron_left" color={iconColor} />
        </button>
        <button css={cx.nextButton} onClick={handleNextSlide}>
          <Icon icon="chevron_right" color={iconColor} />
        </button>
        <div css={cx.indicators}>
          {children.map((_, index) => (
            <div
              key={index}
              css={css`
                ${cx.indicator} ${index === currentSlide ? cx.activeSlide : ''}
              `}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
        <button css={cx.autoplayToggle} onClick={handleAutoplayToggle}>
          {autoplayEnabled ? (
            <Icon icon="pause" color={iconColor} />
          ) : (
            <Icon icon="play_arrow" color={iconColor} />
          )}
        </button>
      </div>
    </Base>
  );
};
