/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState, CSSProperties, ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { useTheme } from '@emotion/react';
import { makeCss } from '../../../theme/base';
import { buttonPalettes, iconPalette, PaletteOptions } from '../../../theme/palettes';
import { ExtendedTheme } from '../../../theme/types';
import { Flexer } from '../../Containers';
import { Icon, Text } from '../../Elements';

export type ButtonSize = 'tiny' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'outlined' | 'standard';

const sizes = {
  tiny: { py: 2, px: 2, fontSize: '0.8rem', iconSize: '14px' },
  sm: { py: 4, px: 4, fontSize: '0.81rem', iconSize: '16px' },
  md: { py: 4, px: 6, fontSize: '0.95rem', iconSize: '17px' },
  lg: { py: 8, px: 8, fontSize: '1rem', iconSize: '20px' },
};

export const cx = {
  buttonRoot: (props: StyleProps) => {
    const padding = props.size ? `${sizes[props.size].py}px ${sizes[props.size].px}px` : '';
    const borderRadius = `${props.br ? props.br : 4}px`;
    const minWidth = props.hasIcon ? 70 : 55;

    const buttonStyle = {
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      padding,
      borderRadius,
      minWidth,
    };

    const v = props.variant ?? 'standard';
    const p = props.palette ?? 'primary';

    return [
      makeCss(props),
      buttonStyle,
      buttonPalettes[p][v],
      props.disabled ? cx.buttonDisabled : '',
    ];
  },
  buttonDisabled: css({
    opacity: '0.5',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  }),
};

export type StyleProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  palette?: PaletteOptions;
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  br?: CSSProperties['borderRadius'];
  disabled?: boolean;
  hasIcon?: boolean;
  theme?: ExtendedTheme;
};

export type ButtonProps = StyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string | undefined;
    style?: CSSProperties;
    startIcon?: string;
    endIcon?: string;
    href?: string | undefined;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'sm',
      variant = 'standard',
      palette = 'primary',
      w,
      ml,
      mr,
      mt,
      mb,
      br,
      type = 'button',
      children,
      onClick,
      className,
      style,
      disabled = false,
      startIcon,
      endIcon,
      href,
    },
    ref
  ) => {
    const theme: any = useTheme();
    const hasIcon = !(!startIcon && !endIcon);
    const styleProps: StyleProps = {
      size,
      variant,
      palette,
      w,
      ml,
      mr,
      mt,
      mb,
      br,
      disabled,
      hasIcon,
      theme,
    };

    const [hover, setHover] = useState(false);
    const handleHref = () => {
      if (href) {
        window.location.href = href;
      }
    };

    const iconColor = hover
      ? iconPalette[palette][variant === 'outlined' ? 'hover' : variant](theme)?.color
      : theme.light;

    return (
      <button
        ref={ref}
        className={clsx(className)}
        css={cx.buttonRoot(styleProps)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={href ? handleHref : onClick}
        type={type}
        disabled={disabled}
        style={style}
      >
        <Flexer a="c" j="c">
          {startIcon && <Icon icon={startIcon} size={sizes[size]?.iconSize} color={iconColor} />}
          <Text a="c" t="button" fw="600" s={sizes[size]?.fontSize}>
            {children}
          </Text>
          {endIcon && <Icon icon={endIcon} size={sizes[size]?.iconSize} color={iconColor} />}
        </Flexer>
      </button>
    );
  }
);
