import { FC, ReactNode } from 'react';
import { Base, BaseProps } from '@/theme/base';
import { css, useTheme } from '@emotion/react';

export const cx = {
  stagger: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  staggerItem: (index: number, theme: any) =>
    css({
      opacity: 0,
      animation: theme.anim.enterLeft1000,
      animationFillMode: 'forwards',
      animationDelay: `${index * 300}ms`,
    }),
  staggerHorizontal: css({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  staggerRightHorizontal: css({
    flexDirection: 'row',
  }),
  StaggerItemRight: (index: number, theme: any) =>
    css({
      opacity: 0,
      animation: theme.anim.enterRight1000,
      animationFillMode: 'forwards',
      animationDelay: `${index * 300}ms`,
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
  const th = useTheme();

  const rootCx = [
    cx.stagger,
    orientation === 'horizontal' && cx.staggerHorizontal,
    direction === 'right' && orientation === 'horizontal' && cx.staggerRightHorizontal,
  ];

  const innerCx = (index: number) => [
    cx.staggerItem(index, th),
    direction === 'right' && cx.StaggerItemRight(index, th),
  ];

  return (
    <Base css={rootCx} w="100%" {...rest}>
      {children.map((child, index) => (
        <div css={innerCx(index)} key={index}>
          {child}
        </div>
      ))}
    </Base>
  );
};
