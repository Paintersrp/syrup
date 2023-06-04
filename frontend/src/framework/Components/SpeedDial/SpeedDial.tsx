import React, { useState } from "react";
import "./SpeedDial.css";

import { Base, BaseProps } from "../../Containers";
import MaterialIcon from "../Icon/MaterialIcon";
import FAB from "../FAB/FAB";

interface SpeedDialItemProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const SpeedDialItem: React.FC<SpeedDialItemProps> = ({
  label,
  icon,
  onClick,
}) => (
  <button className="speed-dial-item" onClick={onClick}>
    <MaterialIcon size="24px" color="secondary" icon={icon} />
  </button>
);

interface SpeedDialProps extends BaseProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  direction: "up" | "down" | "left" | "right";
  children: React.ReactElement<SpeedDialItemProps>[];
}

const SpeedDial: React.FC<SpeedDialProps> = ({
  position,
  direction,
  children,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Base className={`speed-dial speed-dial--${position}`} {...rest}>
      <FAB
        position={position}
        icon={isOpen ? "close" : "add"}
        onClick={handleToggle}
        className="main-fab"
        size="28px"
      />

      {isOpen && (
        <div className={`speed-dial-menu speed-dial-menu--${direction}`}>
          {children.map((child, index) =>
            React.cloneElement(child, { key: index })
          )}
        </div>
      )}
    </Base>
  );
};

export { SpeedDial, SpeedDialItem };
