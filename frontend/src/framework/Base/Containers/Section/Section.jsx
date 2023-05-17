import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import BaseIconButton from "../../BaseIconButton/BaseIconButton";
import Collapser from "../../Collapser/Collapser";
import Divider from "../../Divider/Divider";
import Flexer from "../../Flexer/Flexer";
import Text from "../../Text/Text";

import { shadowSwitch } from "../../../../utils/styleSwitches/styleSwitches";

function Section({
  header,
  children,
  maxWidth,
  boxShadow,
  mb: marginBottom,
  mt: marginTop,
  pad: padding,
  pl: paddingLeft,
  pr: paddingRight,
  pt: paddingTop,
  pb: paddingBottom,
  br: borderRadius,
  b: background,
  j: justifyChildren,
  a: alignChildren,
  fd: flexDirection,
  collapse,
  divider,
  gutter,
  headerAlign,
  headerVar,
  centerAlignIconPosition,
}) {
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
              textAlign: headerAlign,
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
              <BaseIconButton
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
}

Section.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  boxShadow: PropTypes.number,
  mb: PropTypes.number,
  mt: PropTypes.number,
  pad: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  br: PropTypes.number,
  b: PropTypes.string,
  j: PropTypes.string,
  a: PropTypes.string,
  fd: PropTypes.string,
  collapse: PropTypes.bool,
  divider: PropTypes.bool,
  gutter: PropTypes.bool,
  headerAlign: PropTypes.string,
  headerVar: PropTypes.string,
  centerAlignIconPosition: PropTypes.string,
};

Section.defaultProps = {
  maxWidth: "100%",
  boxShadow: 0,
  mb: 3,
  mt: 3,
  pad: 3,
  pl: 0,
  pr: 0,
  pt: 0,
  pb: 0,
  br: 1,
  b: "#F5F5F5",
  j: "flex-start",
  a: "flex-start",
  fd: "column",
  collapse: false,
  divider: false,
  gutter: false,
  headerAlign: "center",
  headerVar: "h3",
  centerAlignIconPosition: "right",
};

export default Section;
