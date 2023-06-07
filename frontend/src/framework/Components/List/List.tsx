import React, { ReactNode, CSSProperties } from "react";
import "./List.css";

import Divider from "../Divider/Divider";
import { JustifyContentValue } from "../../Containers";
import Surface from "../../Containers/Surface/Surface";
import { palettes } from "../../../utils/theming/theme";

interface ListProps {
  children: ReactNode;
  spacing?: number;
  dividers?: boolean;
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
  j?: JustifyContentValue | string;
  a?: JustifyContentValue | string;
  fd?: CSSProperties["flexDirection"];
  fillHeight?: boolean;
  className?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
}

const List: React.FC<ListProps> = ({
  children,
  spacing = 2,
  dividers = true,
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
  br: borderRadius,
  b: background = "inherit",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd: flexDirection = "column",
  fillHeight = false,
  className,
  style,
  innerStyle,
  ...rest
}) => {
  const childCount = React.Children.count(children);

  const spacedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const hasNoDividerProp = child.props.hasOwnProperty("noDivider");
      const hasNoSpacingProp = child.props.hasOwnProperty("noSpacing");
      const childStyle: CSSProperties | undefined = hasNoSpacingProp
        ? undefined
        : { padding: `${spacing * 4}px 0px` };

      const isLastChild = index === childCount - 1;
      const renderDivider = !isLastChild && dividers && !hasNoDividerProp;

      return (
        <React.Fragment key={index}>
          {React.cloneElement(child as React.ReactElement, {
            style: childStyle,
          })}
          {renderDivider && (
            <span>
              <Divider color={palettes.primary.hover} />
            </span>
          )}
        </React.Fragment>
      );
    }
    return null;
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
      bg={background}
      j={justifyChildren}
      a={alignChildren}
      fd={flexDirection}
      fillHeight={fillHeight}
      innerClass={className}
      outerStyle={style}
      innerStyle={innerStyle}
      {...rest}
    >
      {spacedChildren}
    </Surface>
  );
};

export default List;