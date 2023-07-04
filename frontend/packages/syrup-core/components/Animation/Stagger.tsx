import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

const styles = (theme: ExtendedTheme) => ({
  stagger: (orientation: string) =>
    css({
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignItems: orientation === 'horizontal' ? 'flex-start' : undefined,
      justifyContent: orientation === 'horizontal' ? 'center' : undefined,
    }),
  staggerItem: (index: number, direction: string) =>
    css({
      opacity: 0,
      animation: direction === 'right' ? theme.anim.enterRight1000 : theme.anim.enterLeft1000,
      animationFillMode: 'forwards',
      animationDelay: `${index * 300}ms`,
    }),
});

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
  const css = inject(styles);
  return (
    <Base css={css.stagger(orientation)} w="100%" {...rest}>
      {children.map((child, index) => (
        <div css={css.staggerItem(index, direction)} key={index}>
          {child}
        </div>
      ))}
    </Base>
  );
};
