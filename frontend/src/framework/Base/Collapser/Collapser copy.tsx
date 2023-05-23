import React, { useState, useEffect } from "react";
import "./Collapser.css";

interface CollapserProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Collapser: React.FC<CollapserProps> = ({ isOpen, children }) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setContentHeight(isOpen ? null : 0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setContentHeight(null);
    } else {
      const timerId = setTimeout(() => {
        setContentHeight(0);
      }, 0);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isOpen]);

  const getDynamicHeight = (): string | undefined => {
    return contentHeight !== null ? `${contentHeight}px` : undefined;
  };

  return (
    <div className={`collapser ${isOpen ? "open" : ""}`}>
      <div
        className="content"
        style={{
          maxHeight: getDynamicHeight(),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapser;
