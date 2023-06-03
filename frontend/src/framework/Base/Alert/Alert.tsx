import React, { useState, useEffect, useRef } from "react";
import { colorSwitch } from "../../../utils";
import { Flexer } from "../../Containers";
import MaterialIcon from "../Icon/MaterialIcon";
import Text from "../Text/Text";
import "./Alert.css";

type AlertType = "success" | "error" | "warning" | "info" | null;
type AlertFromDirection = "left" | "right" | "bottom" | "top";
type AlertPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface AlertItem {
  message: string;
  type: AlertType;
}

interface AlertProps {
  alert: AlertItem | null;
  onClose: () => void;
  position?: AlertPosition;
  from?: AlertFromDirection;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  alert,
  onClose,
  position = "top-right",
  from = "right",
  duration = 5000,
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
    <div
      className={`alert-snackbar alert-${alert?.type} ${position} dir-${from}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MaterialIcon
        mr={8}
        icon={
          alert
            ? alert?.type === "success"
              ? "check_circle"
              : alert?.type
            : null
        }
        color="#fff"
        size="22px"
      />
      <Text t="body1" s="1rem" className="message" mt={1}>
        {alert?.message}
      </Text>
    </div>
  );
};

export default Alert;
