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

function Content({
  header,
  subheader,
  children,
  maxWidth,
  boxShadow,
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
  headerAlign,
  headerVar,
}) {
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
              textAlign: headerAlign,
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

Content.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  boxShadow: PropTypes.number,
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
  headerAlign: PropTypes.string,
  headerVar: PropTypes.string,
};

Content.defaultProps = {
  boxShadow: 0,
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
  headerAlign: "center",
  headerVar: "h3",
};

export default Content;
