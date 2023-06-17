import { useState, CSSProperties, ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { MaterialIcon } from '@/components/Media';
import { baseCx } from '@/theme/commonCx';
import { buttonPalettes, iconPalettes } from '@/theme/palettes';

export type ButtonSize = 'tiny' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'outlined' | 'standard';
export type ButtonPalette = 'primary' | 'secondary' | 'error' | 'success' | 'info';

const sizes = {
  tiny: { py: 2, px: 2, fontSize: '0.8rem', iconSize: '14px' },
  sm: { py: 4, px: 4, fontSize: '0.81rem', iconSize: '16px' },
  md: { py: 4, px: 6, fontSize: '0.95rem', iconSize: '17px' },
  lg: { py: 8, px: 8, fontSize: '1rem', iconSize: '20px' },
};

const buttonCx = {
  buttonRoot: (props: RootProps) => {
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
      baseCx.root(props),
      buttonStyle,
      buttonPalettes[p][v],
      props.disabled ? buttonCx.buttonDisabled : '',
    ];
  },
  buttonDisabled: css({
    opacity: '0.5',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  }),
};

export type RootProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  palette?: ButtonPalette;
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  br?: CSSProperties['borderRadius'];
  disabled?: boolean;
  hasIcon?: boolean;
};

export type ButtonProps = RootProps &
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
      size = 'md',
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
    const hasIcon = !(!startIcon && !endIcon);
    const rootProps: RootProps = {
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
    };

    const [hover, setHover] = useState(false);
    const handleHref = () => {
      if (href) {
        window.location.href = href;
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(className)}
        css={buttonCx.buttonRoot(rootProps)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={href ? handleHref : onClick}
        type={type}
        disabled={disabled}
        style={style}
      >
        <Flexer a="c" j="c">
          {startIcon && (
            <MaterialIcon
              icon={startIcon}
              size={sizes[size]?.iconSize}
              color={
                hover
                  ? iconPalettes[palette][variant]?.hover
                  : iconPalettes[palette][variant]?.color
              }
            />
          )}
          <Text a="c" t="button" fw="600" s={sizes[size]?.fontSize}>
            {children}
          </Text>
          {endIcon && (
            <MaterialIcon
              icon={endIcon}
              size={sizes[size]?.iconSize}
              color={
                hover
                  ? iconPalettes[palette][variant]?.hover
                  : iconPalettes[palette][variant]?.color
              }
            />
          )}
        </Flexer>
      </button>
    );
  }
);
