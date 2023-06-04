import React, { ReactNode } from "react";
import Base, { BaseProps } from "../../Base/Base";
import "./Stagger.css";

interface StaggerProps extends BaseProps {
  direction: "left" | "right";
  orientation: "vertical" | "horizontal";
  children: ReactNode[];
}

const Stagger: React.FC<StaggerProps> = ({
  direction,
  orientation,
  children,
  ...rest
}) => {
  const staggerWrapperClass = `stagger-wrapper ${direction} ${orientation}`;
  const staggerItemClass = "stagger-item";

  return (
    <Base className={staggerWrapperClass} style={{ width: "100%" }} {...rest}>
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
    </Base>
  );
};

export default Stagger;
