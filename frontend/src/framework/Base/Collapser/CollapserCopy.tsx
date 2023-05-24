import React, { useState, useEffect, useRef } from "react";
import "./CollapserCopy.css";

interface CollapserProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Collapser: React.FC<CollapserProps> = ({ isOpen, children }) => {
  const [contentHeight, setContentHeight] = useState<number | string | null>(
    null
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(
      isOpen ? contentRef.current?.scrollHeight || "auto" : "auto"
    );
  }, [isOpen]);

  return (
    <div className={`collapser ${isOpen ? "open" : ""}`}>
      <div
        className={`collapser-content ${isOpen ? "open" : ""}`}
        style={{ maxHeight: `${contentHeight}px` }}
      >
        <div
          className={`collapser-content-inner ${isOpen ? "open" : ""}`}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapser;
