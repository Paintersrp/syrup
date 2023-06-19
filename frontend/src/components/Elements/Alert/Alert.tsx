import React, { useState, useEffect, useRef } from 'react';
import './Alert.css';

import { Base, BaseProps } from '@/theme/base';
import { MaterialIcon } from '../../Media';
import Text from '../Text/Text';
import { AlertState } from '@/stores/alert';

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

const Alert: React.FC<AlertProps> = ({
  alert,
  onClose,
  position = 'top-right',
  from = 'right',
  duration = 5000,
  ...rest
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

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
      className={`alert-snackbar alert-${alert?.type} ${position} dir-${from}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <MaterialIcon
        mr={8}
        icon={alert ? (alert?.type === 'success' ? 'check_circle' : alert?.type) : null}
        color="#fff"
        size="22px"
      />
      <Text t="body1" s="1rem" className="message" mt={1}>
        {alert?.message}
      </Text>
    </Base>
  );
};

export default Alert;
