import { FC, useState, useEffect, ReactNode, CSSProperties } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { Base, BaseProps } from '@/theme/base';
import { mediaQueries } from '@/theme/common/breakpoints';
import { inject } from '@/theme/utils';
import { ExtendedTheme } from '@/theme/types';
import { Icon } from '@/components/Elements';

const styles = (theme: ExtendedTheme) => ({
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
  ctrlButton: (side: string) =>
    css({
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
      left: side === 'left' ? 0 : undefined,
      right: side === 'right' ? 0 : undefined,
      '&:focus': {
        outline: 'none',
      },
      '&:hover': {
        backgroundColor: theme.backdrop,
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
    zIndex: 3,
    ...theme.flex('c', 'c'),
  }),
  indicator: (active: boolean) =>
    css({
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: active ? theme.secondary : '#fff',
      margin: '0 5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
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
});

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
  const css = inject(styles);
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
      <div css={css.carousel} style={style}>
        <div css={css.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {children.map((child, index) => (
            <div key={index} css={css.slide}>
              {child}
            </div>
          ))}
        </div>
        <button css={css.ctrlButton('left')} onClick={handlePreviousSlide}>
          <Icon icon="chevron_left" color={iconColor} />
        </button>
        <button css={css.ctrlButton('right')} onClick={handleNextSlide}>
          <Icon icon="chevron_right" color={iconColor} />
        </button>
        <div css={css.indicators}>
          {children.map((_, index) => (
            <div
              key={index}
              css={css.indicator(index === currentSlide)}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
        <button css={css.autoplayToggle} onClick={handleAutoplayToggle}>
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
