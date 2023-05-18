import React, { useRef, useState, useLayoutEffect, ReactNode } from "react";

interface CollapserProps {
  isOpen: boolean;
  children: ReactNode;
}

const Collapser: React.FC<CollapserProps> = ({ isOpen, children }) => {
  const [height, setHeight] = useState<number | string>("110%");
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight + 20 : 0);
    }
  }, [isOpen, children, contentRef]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setHeight(0);
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapser;
