import { useState, useEffect, useRef, FC } from 'react';
import { css, keyframes } from '@emotion/react';
import { GenericMapping } from '@/types';
import { ExtendedTheme } from '@/theme/types';
import { makeCamelCase } from 'sy-core/theme/utils/format';
import { Base, BaseProps, Icon, Text } from 'sy-core';
import { AlertState } from '@/stores/alert';
import { inject } from '@/theme/utils/inject';

const transformMapping: GenericMapping = {
  left: { start: 'translateX(-100%)', finish: 'translateX(0)' },
  right: { start: 'translateX(100%)', finish: 'translateX(0)' },
  top: { start: 'translateY(-100%)', finish: 'translateY(0)' },
  bottom: { start: 'translateY(100%)', finish: 'translateY(0)' },
};

const positionMapping: GenericMapping = {
  topLeft: {
    top: 56,
    left: 15,
    transform: 'translateX(0)',
  },
  topCenter: {
    top: 56,
    left: '45%',
  },
  topRight: {
    top: 56,
    right: 15,
    transform: 'translateX(0)',
  },
  bottomLeft: {
    bottom: 20,
    left: 15,
    transform: 'translateX(0)',
  },
  bottomCenter: {
    bottom: 20,
    left: '45%',
  },
  bottomRight: {
    bottom: 20,
    right: 15,
    transform: 'translateX(0)',
  },
};

export const kf = {
  slide: (position: string) => {
    const transform = transformMapping[position];

    return keyframes({
      '0%': {
        opacity: 0,
        transform: transform.start,
      },
      '100%': {
        opacity: 1,
        transform: transform.finish,
      },
    });
  },
};

const styles = (theme: ExtendedTheme) => ({
  alert: (type: string, position: string, from: string) => {
    const formattedPosition = makeCamelCase(position);
    return css({
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      padding: theme.sp(3, 3, 3, 1.5),
      borderRadius: 4,
      color: theme.light,
      opacity: 1,
      zIndex: 9999,
      boxShadow: theme.shadows[2],
      minWidth: 200,
      backgroundColor: theme[type],
      animation: `${kf.slide(from)} 0.3s ease forwards`,
      ...positionMapping[formattedPosition],
    });
  },
});

type AlertFromDirection = 'left' | 'right' | 'bottom' | 'top';
type AlertPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface AlertProps extends BaseProps {
  alert: AlertState | null;
  onClose: () => void;
  position?: AlertPosition;
  from?: AlertFromDirection;
  duration?: number;
}

export const Alert: FC<AlertProps> = ({
  alert,
  onClose,
  position = 'top-right',
  from = 'right',
  duration = 5000,
  ...rest
}) => {
  const css = inject(styles);

  const timerRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const finalIcon = alert ? (alert?.type === 'success' ? 'check_circle' : alert?.type) : null;

  useEffect(() => {
    if (alert) {
      setVisible(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [alert, onClose]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (alert) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Base
      css={css.alert(alert?.type, position, from)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <Icon mr={8} icon={finalIcon} color="light" size="22px" />
      <Text t="body1" s="1rem" className="message" mt={1}>
        {alert?.message}
      </Text>
    </Base>
  );
};
