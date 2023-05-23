import React, { ReactNode, CSSProperties } from "react";

interface ContainerProps {
  children: ReactNode;
  align?: CSSProperties["alignContent"];
  justify?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
  textAlign?: CSSProperties["textAlign"];
  style?: CSSProperties;
  spacing?: number;
  className?: string;
}

interface ChildProps {
  style?: CSSProperties;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  align = "center",
  justify = "center",
  direction = "row",
  textAlign = "left",
  style,
  spacing = 0,
  className,
}) => {
  const childrenWithSpacing = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childClassName = child.props.className;
      const childHasItemClass =
        childClassName && childClassName.includes("item");

      const style = childHasItemClass
        ? { ...child.props.style, padding: `${spacing * 4}px` }
        : child.props.style;

      const props: ChildProps = { style, className: childClassName };

      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignContent: align,
        justifyContent: justify,
        flexDirection: direction,
        textAlign,
        ...style,
      }}
    >
      {childrenWithSpacing}
    </div>
  );
};

export default Container;
