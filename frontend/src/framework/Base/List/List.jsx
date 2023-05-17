import React from "react";
import PropTypes from "prop-types";
import "./List.css";

import Divider from "../Divider/Divider";
import Surface from "../Containers/Surface/Surface";

const List = ({
  children,
  spacing,
  divider,
  maxWidth,
  boxShadow,
  mb: marginBottom,
  mt: marginTop,
  px: paddingX,
  py: paddingY,
  pl: paddingLeft,
  pr: paddingRight,
  pt: paddingTop,
  pb: paddingBottom,
  br: borderRadius,
  b: background,
  j: justifyChildren,
  a: alignChildren,
  fd: flexDirection,
  gutter,
  fillHeight,
  className,
}) => {
  const childCount = React.Children.count(children);
  const spacedChildren = React.Children.map(children, (child, index) => {
    const childStyle = spacing > 0 ? { margin: `${spacing * 4}px 0px` } : null;
    const isLastChild = index === childCount - 1;
    const renderDivider = !isLastChild && divider;

    return (
      <React.Fragment>
        <div key={index} style={childStyle}>
          {child}
        </div>
        {renderDivider && (
          <span>
            <Divider />
          </span>
        )}
      </React.Fragment>
    );
  });

  return (
    <Surface
      maxWidth={maxWidth}
      boxShadow={boxShadow}
      mb={marginBottom}
      mt={marginTop}
      px={paddingX}
      py={paddingY}
      pl={paddingLeft}
      pr={paddingRight}
      pt={paddingTop}
      pb={paddingBottom}
      br={borderRadius}
      b={background}
      j={justifyChildren}
      a={alignChildren}
      fd={flexDirection}
      gutter={gutter}
      fillHeight={fillHeight}
      className={className}
    >
      {spacedChildren}
    </Surface>
  );
};

List.propTypes = {
  children: PropTypes.node,
  spacing: PropTypes.number,
  divider: PropTypes.bool,
  maxWidth: PropTypes.number,
  boxShadow: PropTypes.number,
  marginBottom: PropTypes.number,
  marginTop: PropTypes.number,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  borderRadius: PropTypes.node,
  background: PropTypes.string,
  justifyChildren: PropTypes.string,
  alignChildren: PropTypes.string,
  flexDirection: PropTypes.string,
  gutter: PropTypes.bool,
  fillHeight: PropTypes.bool,
  className: PropTypes.string,
};

List.defaultProps = {
  children: null,
  spacing: 2,
  divider: true,
  maxWidth: undefined,
  boxShadow: 1,
  marginBottom: 0,
  marginTop: 0,
  paddingX: 1.5,
  paddingY: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  borderRadius: 0.5,
  background: "#F5F5F5",
  justifyChildren: "flex-start",
  alignChildren: "flex-start",
  flexDirection: "column",
  gutter: false,
  fillHeight: false,
  className: undefined,
};

export default List;
