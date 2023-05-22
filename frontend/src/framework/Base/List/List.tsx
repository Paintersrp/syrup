import React, { ReactNode, CSSProperties } from "react";
import "./List.css";

import Divider from "../Divider/Divider";
import Surface from "../../Containers/Surface/Surface";
import { JustificationValue } from "../../Containers/Flexer/Flexer";
import { palettes } from "../../../theme";

interface ListProps {
  children: ReactNode;
  spacing?: number;
  divider?: boolean;
  maxWidth?: number;
  boxShadow?: number;
  mb?: number;
  mt?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  br?: number;
  b?: string;
  j?: JustificationValue | string;
  a?: JustificationValue | string;
  fd?: CSSProperties["flexDirection"];
  gutter?: boolean;
  fillHeight?: boolean;
  className?: string;
}

const List: React.FC<ListProps> = ({
  children,
  spacing = 2,
  divider = true,
  maxWidth,
  boxShadow = 1,
  mb: marginBottom = 0,
  mt: marginTop = 0,
  px: paddingX = 1.5,
  py: paddingY = 0,
  pl: paddingLeft = 0,
  pr: paddingRight = 0,
  pt: paddingTop = 0,
  pb: paddingBottom = 0,
  br: borderRadius = 0.5,
  b: background = "inherit",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd: flexDirection = "column",
  gutter = false,
  fillHeight = false,
  className,
}) => {
  const childCount = React.Children.count(children);
  const spacedChildren = React.Children.map(children, (child, index) => {
    const childStyle =
      spacing > 0 ? { margin: `${spacing * 4}px 0px` } : undefined;
    const isLastChild = index === childCount - 1;
    const renderDivider = !isLastChild && divider;

    return (
      <React.Fragment key={index}>
        <div style={childStyle}>{child}</div>
        {renderDivider && (
          <span>
            <Divider color={palettes.primary.hover} />
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

export default List;
