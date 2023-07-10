/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useState, CSSProperties, ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { buttonPalettes, iconPalette } from '../../../theme/palettes';
import { Flexer } from '../../Containers';
import { Icon, Text } from '../../Elements';
import {
  StyleProps,
  buildStyles,
  SizeOptions,
  GenericPalette,
} from '../../../theme/base/StyleProps';

const sizes: SizeOptions = {
  tiny: { py: 2, px: 2, fontSize: '0.8rem', iconSize: '14px' },
  sm: { py: 4, px: 4, fontSize: '0.81rem', iconSize: '16px' },
  md: { py: 4, px: 6, fontSize: '0.95rem', iconSize: '17px' },
  lg: { py: 8, px: 8, fontSize: '1rem', iconSize: '20px' },
};

export const styles = {
  buttonRoot: (props: StyleProps) => {
    const padding = props.size ? `${sizes[props.size]?.py}px ${sizes[props.size]?.px}px` : '';
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

    const palette = props.palette || 'primary';
    const variant = props.variant || 'standard';
    const buttonPalette = buttonPalettes[palette][variant];

    return [buttonStyle, buttonPalette];
  },
  buttonDisabled: css({
    opacity: '0.5',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  }),
};

export type ButtonProps = StyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'tiny' | 'sm' | 'md' | 'lg';
    variant?: 'outlined' | 'standard';
    palette?: GenericPalette;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string | undefined;
    style?: CSSProperties;
    startIcon?: string;
    endIcon?: string;
    href?: string | undefined;
  };

/***
 * TODO
 * Headless Boolean? Part of Style Prop?
 * Full implement Abstract Style Props (Rename just StyleProps)
 * Better Palette Handling / More Dynamic / Generic
 *
 *
 * Inject should also optionally return theme
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'sm',
      variant = 'standard',
      palette = 'primary',
      type = 'button',
      children,
      onClick,
      className,
      style,
      disabled = false,
      startIcon,
      endIcon,
      href,
      ...rest
    },
    ref
  ) => {
    const [hover, setHover] = useState(false);
    const hasIcon = !(!startIcon && !endIcon);
    const { theme, styleProps, baseCss } = buildStyles({
      size,
      variant,
      palette,
      hasIcon,
      disabled,
      ...rest,
    });

    const buttonCss = [
      baseCss,
      styles.buttonRoot(styleProps),
      disabled ? styles.buttonDisabled : '',
    ];

    const iconColor = hasIcon
      ? hover
        ? iconPalette[palette][variant === 'outlined' ? 'hover' : variant](theme)?.color
        : theme.light
      : undefined;

    const handleHref = () => {
      if (href) {
        window.location.href = href;
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(className)}
        css={buttonCss}
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
