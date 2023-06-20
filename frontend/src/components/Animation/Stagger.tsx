import { FC, ReactNode } from 'react';
import { Base, BaseProps } from '@/theme/base';
import { css, keyframes } from '@emotion/react';

const staggerAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

const staggerAnimationRight = keyframes`
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const staggerCx = {
  stagger: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  horizontal: css({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  right: css({
    flexDirection: 'row',
  }),
  staggerItem: css({
    opacity: 0,
    animation: `${staggerAnimation} 0.5s ease-in-out`,
    animationFillMode: 'forwards',
  }),
  staggerHorizontal: css({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  staggerRightHorizontal: css({
    flexDirection: 'row',
  }),
  staggerWrapperRightItem: css({
    animationName: staggerAnimationRight,
  }),
};

interface StaggerProps extends BaseProps {
  direction?: 'left' | 'right';
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode[];
}

export const Stagger: FC<StaggerProps> = ({
  direction = 'left',
  orientation = 'horizontal',
  children,
  ...rest
}) => {
  return (
    <Base
      css={[
        staggerCx.stagger,
        orientation === 'horizontal' && staggerCx.staggerHorizontal,
        direction === 'right' && orientation === 'horizontal' && staggerCx.staggerRightHorizontal,
      ]}
      w="100%"
      {...rest}
    >
      {children.map((child, index) => (
        <div
          css={[staggerCx.staggerItem, direction === 'right' && staggerCx.staggerWrapperRightItem]}
          key={index}
          style={{
            animationDelay: `${index * 300}ms`,
            animationDuration: '1s',
          }}
        >
          {child}
        </div>
      ))}
    </Base>
  );
};
