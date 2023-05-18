import React, {
  FC,
  useState,
  useEffect,
  CSSProperties,
  ReactNode,
} from "react";
import classNames from "classnames";
import "./Drawer.css";

interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  side?: "left" | "right" | "top" | "bottom";
  variant?: "standard" | "persistent" | "permanent";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Drawer: FC<DrawerProps> = ({
  open = false,
  onClose = () => {},
  side = "left",
  variant = "standard",
  className = "",
  style = {},
  children = null,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (variant === "permanent") {
      setIsOpen(true);
    }
  }, [variant]);

  const handleClose = () => {
    onClose();
  };

  const hasOverlay = variant !== "permanent";

  const classes = classNames(
    "sidedrawer",
    `sidedrawer-${side}`,
    { "sidedrawer-open": isOpen },
    { "sidedrawer-has-overlay": hasOverlay },
    className
  );

  return (
    <>
      {hasOverlay && (
        <div
          className="sidedrawer-overlay"
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          onClick={handleClose}
        ></div>
      )}
      <div
        className={classes}
        style={{
          ...style,
          visibility: isOpen || variant === "permanent" ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
