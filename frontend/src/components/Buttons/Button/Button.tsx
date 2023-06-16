import {
  useEffect,
  useState,
  CSSProperties,
  ReactNode,
  ButtonHTMLAttributes,
  forwardRef,
} from 'react';
import clsx from 'clsx';
import './Button.css';

import { ColorShade, ColorState, colorSwitch } from '../../../utils/theming/styleSwitches';
import { MaterialIcon } from '../../Media';
import { Flexer } from '../../Containers';
import { Text } from '../../Elements';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type ButtonSize = 'tiny' | 'sm' | 'md' | 'lg';

const sizes = {
  tiny: { py: 2, px: 2, fs: '0.8rem', is: '14px' },
  sm: { py: 4, px: 4, fs: '0.81rem', is: '16px' },
  md: { py: 4, px: 6, fs: '0.95rem', is: '17px' },
  lg: { py: 8, px: 8, fs: '1rem', is: '20px' },
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  color?: string;
  shade?: ColorShade;
  manualHover?: string;
  type?: ButtonType;
  children: ReactNode;
  onClick?: any;
  className?: string | undefined;
  style?: CSSProperties;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  iconColor?: string;
  iconHoverColor?: string;
  href?: string | undefined;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    size = 'sm',
    w: width = 'auto',
    ml: marginLeft,
    mr: marginRight,
    mt: marginTop,
    mb: marginBottom,
    color = 'primary',
    shade = 'main',
    manualHover,
    type = 'button',
    children,
    onClick,
    className = undefined,
    style,
    disabled = false,
    startIcon,
    endIcon,
    iconColor = '#f5f5f5',
    iconHoverColor = '#f5f5f5',
    href,
  } = props;

  const [colors, setColors] = useState<ColorState>(colorSwitch(color, shade));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  const handleHref = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <button
      ref={ref}
      className={clsx('button-base', className, disabled ? 'disabled' : '')}
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
        // padding: sizeSwitch(size),
        backgroundColor: hover ? (manualHover ? manualHover : colors.hover) : colors.background,
      }}
    >
      <Flexer a="c" j="c">
        {startIcon && (
          <MaterialIcon
            icon={startIcon}
            size={sizes[size]?.is}
            mr={0}
            ml={0}
            color={hover ? iconHoverColor : iconColor}
          />
        )}
        <Text a="c" t="button" fw="600" s={sizes[size]?.fs}>
          {children}
        </Text>
        {endIcon && (
          <MaterialIcon
            icon={endIcon}
            size={sizes[size].is}
            ml={0}
            color={hover ? iconHoverColor : iconColor}
          />
        )}
      </Flexer>
    </button>
  );
});
