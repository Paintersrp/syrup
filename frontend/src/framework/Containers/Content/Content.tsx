import React, { useState, ReactNode, CSSProperties } from "react";
import "../styles.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { JustificationValue } from "../Flexer/Flexer";
import { TextAlign, TextType } from "../../Base/Text/Text";

import { Collapser, Divider, IconButton, Text } from "../../Base";
import { Flexer } from "../../Containers";

import { shadowSwitch } from "../../../utils/styleSwitches/styleSwitches";

interface ContentProps {
  header?: string;
  subheader?: string;
  children?: ReactNode;
  maxWidth?: number | string;
  boxShadow?: number;
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
  headerAlign?: TextAlign;
  headerVar?: TextType;
}

function Content({
  children,
  header = "",
  subheader = "",
  maxWidth = "100%",
  boxShadow = 0,
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
  headerAlign = "center",
  headerVar = "h3",
}: ContentProps) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        paddingRight: paddingRight * 8,
        paddingLeft: paddingLeft * 8,
        paddingTop: paddingTop * 8,
        paddingBottom: paddingBottom * 8,
        background: background,
      }}
    >
      <div
        style={{
          maxWidth: maxWidth,
          padding: padding * 8,
          boxShadow: shadowSwitch(boxShadow),
          borderRadius: borderRadius * 8,
          background: background,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Flexer j="c">
          <Flexer
            a="c"
            style={{
              marginLeft: collapse ? (headerAlign === "left" ? 0 : 26) : 0,
            }}
          >
            {header && (
              <Text t={headerVar} className="header" a={headerAlign}>
                {header}
              </Text>
            )}
          </Flexer>

          {collapse && (
            <Flexer j="fe" a="c" w={26}>
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
        {divider && <Divider />}

        <Collapser isOpen={open}>
          {subheader && (
            <Text t="body2" className="subheader">
              {subheader}
            </Text>
          )}

          <Flexer j={justifyChildren} a={alignChildren} fd={flexDirection}>
            {children}
          </Flexer>
        </Collapser>
      </div>
    </div>
  );
}

export default Content;
