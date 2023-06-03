import React, { ReactNode } from "react";
import "./Stagger.css";

interface StaggerProps {
  direction: "left" | "right";
  orientation: "vertical" | "horizontal";
  children: ReactNode[];
}

const Stagger: React.FC<StaggerProps> = ({
  direction,
  orientation,
  children,
}) => {
  const staggerWrapperClass = `stagger-wrapper ${direction} ${orientation}`;
  const staggerItemClass = "stagger-item";

  return (
    <div className={staggerWrapperClass} style={{ width: "100%" }}>
      {children.map((child, index) => (
        <div
          className={staggerItemClass}
          key={index}
          style={{
            animationDelay: `${index * 300}ms`,
            animationDuration: "1s",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Stagger;
