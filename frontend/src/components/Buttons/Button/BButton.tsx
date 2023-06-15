import { useState, CSSProperties, ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import './Button.css';

import { MaterialIcon } from '../../Media';
import { Flexer } from '../../Containers';
import { Text } from '../../Elements';
import { palettes } from '@/utils';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type ButtonSize = 'tiny' | 'sm' | 'md' | 'lg';
export type ButtonVariants = 'outlined' | 'standard';
export type ButtonPalettes = 'primary' | 'secondary' | 'error' | 'success' | 'info';

const sizes = {
  tiny: { py: 2, px: 2, fontSize: '0.8rem', iconSize: '14px' },
  sm: { py: 4, px: 4, fontSize: '0.81rem', iconSize: '16px' },
  md: { py: 4, px: 6, fontSize: '0.95rem', iconSize: '17px' },
  lg: { py: 8, px: 8, fontSize: '1rem', iconSize: '20px' },
};

const buttonPalettes = {
  outlined: {
    primary: {
      className: 'primary-button-outlined',
      iconHover: '#f5f5f5',
      iconColor: palettes.primary.main,
    },
    secondary: {
      className: 'secondary-button-outlined',
      iconHover: '#f5f5f5',
      iconColor: palettes.secondary.main,
    },
    error: {
      className: 'error-button-outlined',
      iconHover: '#f5f5f5',
      iconColor: palettes.error.main,
    },
    success: {
      className: 'success-button-outlined',
      iconHover: '#f5f5f5',
      iconColor: palettes.success.main,
    },
    info: {
      className: 'info-button-outlined',
      iconHover: '#f5f5f5',
      iconColor: palettes.info.main,
    },
  },
  standard: {
    primary: {
      className: 'primary-button-standard',
      iconHover: '#f5f5f5',
      iconColor: '#f5f5f5',
    },
    secondary: {
      className: 'secondary-button-standard',
      iconHover: '#f5f5f5',
      iconColor: '#f5f5f5',
    },
    error: {
      className: 'error-button-standard',
      iconHover: '#f5f5f5',
      iconColor: '#f5f5f5',
    },
    success: {
      className: 'success-button-standard',
      iconHover: '#f5f5f5',
      iconColor: '#f5f5f5',
    },
    info: {
      className: 'info-button-standard',
      iconHover: '#f5f5f5',
      iconColor: '#f5f5f5',
    },
  },
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariants;
  palette?: ButtonPalettes;
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  manualHover?: string;
  type?: ButtonType;
  children: ReactNode;
  onClick?: (event: any) => void;
  className?: string | undefined;
  style?: CSSProperties;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  href?: string | undefined;
};

const BButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    size = 'md',
    variant = 'standard',
    palette = 'primary',
    w: width = 'auto',
    ml: marginLeft,
    mr: marginRight,
    mt: marginTop,
    mb: marginBottom,
    manualHover,
    type = 'button',
    children,
    onClick,
    className = undefined,
    style,
    disabled = false,
    startIcon,
    endIcon,
    href,
  } = props;

  const [hover, setHover] = useState<boolean>(false);
  const handleHref = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <button
      ref={ref}
      className={clsx(
        'button-base',
        className,
        disabled ? 'disabled' : '',
        buttonPalettes[variant][palette].className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={href ? handleHref : onClick}
      type={type}
      disabled={disabled}
      style={{
        ...style,
        width: width,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
        padding: `${sizes[size]?.py}px ${sizes[size]?.px}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flexer a="c" j="c">
        {startIcon && (
          <MaterialIcon
            icon={startIcon}
            size={sizes[size]?.iconSize}
            mr={0}
            ml={0}
            color={
              hover
                ? buttonPalettes[variant][palette]?.iconHover
                : buttonPalettes[variant][palette]?.iconColor
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
            ml={0}
            color={
              hover
                ? buttonPalettes[variant][palette]?.iconHover
                : buttonPalettes[variant][palette]?.iconColor
            }
          />
        )}
      </Flexer>
    </button>
  );
});

export default BButton;
