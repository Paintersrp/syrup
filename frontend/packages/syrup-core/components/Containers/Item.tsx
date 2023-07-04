import { CSSProperties, FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Base, BaseProps } from '@/theme/base';

interface ItemProps extends BaseProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  justify?: string;
  align?: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const ItemContainer = styled(Base)<ItemProps>`
  flex: 0 1 auto;
  max-width: 100%;

  ${(props: any) => css`
    @media (min-width: 0px) {
      flex-basis: ${props['--item-basis-xs']};
    }

    @media (min-width: 500px) {
      flex-basis: ${props['--item-basis-sm']};
    }

    @media (min-width: 650px) {
      flex-basis: ${props['--item-basis-md']};
    }

    @media (min-width: 900px) {
      flex-basis: ${props['--item-basis-lg']};
    }

    @media (min-width: 1280px) {
      flex-basis: ${props['--item-basis-xl']};
    }
  `};
`;

export const Item: FC<ItemProps> = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  justify = 'center',
  align = 'center',
  children,
  style,
  className,
  ...rest
}) => {
  const getBasis = (breakpointValue: number | undefined, defaultValue: number): string => {
    const value = breakpointValue !== undefined ? breakpointValue : defaultValue;
    return value * 8.333333333333333 + '%';
  };

  const itemBasis = {
    '--item-basis-xs': getBasis(xs, 12),
    '--item-basis-sm': getBasis(sm, xs),
    '--item-basis-md': getBasis(md, sm || xs),
    '--item-basis-lg': getBasis(lg, md || sm || xs),
    '--item-basis-xl': getBasis(xl, lg || md || sm || xs),
  } as CSSProperties;

  return (
    <ItemContainer
      className={className}
      style={{
        display: 'flex',
        justifyContent: justify,
        alignItems: align,
        ...style,
      }}
      {...itemBasis}
      {...rest}
    >
      {children}
    </ItemContainer>
  );
};
