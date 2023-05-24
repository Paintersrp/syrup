import React, { useState, ReactNode, CSSProperties } from "react";
import "../Containers.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { JustificationValue } from "../Flexer/Flexer";
import { TextAlign, TextType } from "../../Base/Text/Text";

import { Collapser, Divider, IconButton, Text } from "../../Base";
import { Flexer } from "../../Containers";

import { shadowSwitch } from "../../../utils/switches/styleSwitches";

interface SectionProps {
  header?: string;
  children?: ReactNode;
  maxWidth?: number | string;
  boxShadow?: number;
  mb?: number;
  mt?: number;
  pad?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  br?: number;
  b?: string;
  j?: JustificationValue;
  a?: JustificationValue;
  fd?: CSSProperties["flexDirection"];
  collapse?: boolean;
  divider?: boolean;
  gutter?: boolean;
  headerAlign?: TextAlign;
  headerVar?: TextType;
  centerAlignIconPosition?: string;
}

const Section: React.FC<SectionProps> = ({
  header,
  children,
  maxWidth = "100%",
  boxShadow = 0,
  mb: marginBottom = 3,
  mt: marginTop = 3,
  pad: padding = 3,
  pl: paddingLeft = 0,
  pr: paddingRight = 0,
  pt: paddingTop = 0,
  pb: paddingBottom = 0,
  br: borderRadius = 0.5,
  b: background = "#F5F5F5",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd: flexDirection = "column",
  collapse = false,
  divider = false,
  gutter = false,
  headerAlign = "center",
  headerVar = "h3",
  centerAlignIconPosition = "right",
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Flexer
      j="c"
      pl={paddingLeft * 8}
      style={{
        height: "100%",
        margin: 0,
        paddingRight: paddingRight * 8,
        paddingTop: paddingTop * 8,
        paddingBottom: paddingBottom * 8,
        marginBottom: gutter ? 16 : 0,
        background: background,
      }}
    >
      <div
        style={{
          height: "100%",
          maxWidth: maxWidth,
          padding: padding * 8,
          boxShadow: shadowSwitch(boxShadow),
          borderRadius: borderRadius * 8,
          background: background,
          marginBottom: marginBottom * 8,
          marginTop: marginTop * 8,
          width: "100%",
        }}
      >
        <Flexer j="c">
          <Flexer
            a="c"
            style={{
              order:
                headerAlign === "right" && collapse
                  ? 1
                  : headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "right"
                    ? 0
                    : 1
                  : 1,
              marginLeft:
                headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "right"
                    ? 26
                    : 0
                  : 0,
              marginRight:
                headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "left"
                    ? 26
                    : 0
                  : 0,
            }}
          >
            {header && (
              <Text t={headerVar} className="header" a={headerAlign}>
                {header}
              </Text>
            )}
          </Flexer>

          {collapse && (
            <Flexer
              j="c"
              a="c"
              w={26}
              style={{
                order:
                  headerAlign === "right" && collapse
                    ? 0
                    : headerAlign === "center" && collapse
                    ? centerAlignIconPosition === "right"
                      ? 1
                      : 0
                    : 1,
              }}
            >
              <IconButton
                className={`expandButton ${open ? "rotate" : ""}`}
                size="tiny"
                onClick={() => setOpen(!open)}
                icon={faChevronDown}
                fontSize="0.9rem"
              />
            </Flexer>
          )}
        </Flexer>
        {divider && <Divider mt={2} mb={8} color="rgba(0, 0, 0, 0.38)" />}

        <Collapser isOpen={open}>
          <Flexer j={justifyChildren} a={alignChildren} fd={flexDirection}>
            {children}
          </Flexer>
        </Collapser>
      </div>
    </Flexer>
  );
};
export default Section;
