import React, { useState, useRef, useEffect, ReactNode } from "react";
import "./Menu.css";

import Button from "../Button/Button";
import Divider from "../Divider/Divider";

interface MenuProps {
  children: ReactNode;
  position?: string;
  manualButton?: ReactNode;
  dividers?: boolean;
  buttonText?: string;
}

const Menu: React.FC<MenuProps> = ({
  children,
  position = "bottom",
  manualButton,
  dividers = false,
  buttonText = "Open Menu",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const getMenuPosition = () => {
    return isOpen ? "block" : "none";
  };

  const getMenuStyle = () => {
    const style: React.CSSProperties = { display: getMenuPosition() };

    if (position.includes("top")) {
      style.bottom = "100%";
      style.marginBottom = "5px";
    } else {
      style.top = "100%";
      style.marginTop = "5px";
    }

    if (position.includes("left")) {
      style.left = "0";
      style.transform = "translateX(-90%)";
    } else if (position.includes("right")) {
      style.right = "0";
      style.transform = "translateX(90%)";
    } else {
      style.left = "50%";
      style.transform = "translateX(-50%)";
    }

    return style;
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const renderChildren = React.Children.map(children, (child, index) => {
    const shouldRenderDivider = dividers && index !== 0;

    return (
      <>
        {shouldRenderDivider && <Divider />}
        {child}
      </>
    );
  });

  return (
    <div className="menu-root" ref={dropdownRef}>
      {manualButton ? (
        React.cloneElement(manualButton as React.ReactElement, {
          onClick: toggleDropdown,
        })
      ) : (
        <Button size="sm" onClick={toggleDropdown}>
          {buttonText}
        </Button>
      )}
      <div
        className={`menu-container ${isOpen ? "open" : ""}`}
        style={getMenuStyle()}
      >
        {renderChildren}
      </div>
    </div>
  );
};

export default Menu;
