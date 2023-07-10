/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { useTheme } from '@emotion/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { makeCss } from '../../../theme/base';
import { iconPalette, PaletteOptions } from '../../../theme/palettes';

const iconButtonSizes = {
  tiny: { width: 26, height: 26, iconSize: '21px' },
  sm: { width: 32, height: 32, iconSize: '24px' },
  md: { width: 36, height: 36, iconSize: '24px' },
  lg: { width: 40, height: 40, iconSize: '26px' },
  xl: { width: 48, height: 48, iconSize: '26px' },
};

const cx = {
  iconButton: (props: RootProps) => {
    const { ml, mr, mt, mb, pl, pr, theme, size, variant, palette } = props;

    const iconButtonStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      fontSize: '0.9rem',
      width: size && iconButtonSizes[size].width,
      height: size && iconButtonSizes[size].height,
    };

    const cssProps = { ml, mr, mt, mb, pl, pr };
    const v = variant ?? 'standard';
    const p = palette ?? 'primary';

    return [makeCss(cssProps), iconButtonStyle, iconPalette[p][v](theme)];
  },
};

export type IconButtonSize = 'tiny' | 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'float' | 'standard' | 'hover';

export type RootProps = {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  palette?: PaletteOptions;
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  pl?: CSSProperties['paddingLeft'];
  pr?: CSSProperties['paddingRight'];
  disabled?: boolean;
  theme?: any;
};

export type BrandButtonProps = RootProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string | undefined;
    style?: CSSProperties;
    iconStyle?: CSSProperties;
    href?: string | undefined;
    icon: IconDefinition;
    fontSize: string;
  };

export const BrandButton: React.FC<BrandButtonProps> = ({
  size = 'sm',
  variant = 'standard',
  palette = 'primary',
  w,
  ml,
  mr,
  mt,
  mb,
  pl,
  pr,
  href,
  onClick = () => {},
  className,
  style,
  iconStyle,
  fontSize = '1rem',
  icon,
  disabled,
}) => {
  const theme: any = useTheme();
  const rootProps: RootProps = {
    size,
    variant,
    palette,
    w,
    ml,
    mr,
    mt,
    mb,
    pl,
    pr,
    disabled,
    theme,
  };

  const handleHref = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <button
      disabled={disabled}
      css={cx.iconButton(rootProps)}
      className={clsx(className)}
      onClick={href ? handleHref : onClick}
      style={style}
    >
      <FontAwesomeIcon icon={icon} style={{ ...iconStyle, fontSize }} />
    </button>
  );
};
