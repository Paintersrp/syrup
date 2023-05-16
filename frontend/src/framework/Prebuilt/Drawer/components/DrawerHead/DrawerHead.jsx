import React from "react";
import { palettes } from "../../../../../theme";

import Flexer from "../../../../Base/Flexer/Flexer";
import Divider from "../../../../Base/Divider/Divider";

const DrawerHead = ({
  j: justifyContent = "center",
  a: alignItems = "center",
  title,
  icon,
  children,
}) => {
  return (
    <React.Fragment>
      <Flexer j={justifyContent} a={alignItems} style={{ height: 63 }}>
        <Flexer j="c">
          {icon && (
            <span
              style={{
                position: "absolute",
                display: "flex",
                left: 0,
                marginLeft: 24,
              }}
            >
              {icon && icon}
            </span>
          )}
          {title && <h3>{title}</h3>}
        </Flexer>
        {children}
      </Flexer>
      <Divider margin={0} color={palettes.primary.light} thickness={1} />
    </React.Fragment>
  );
};

export default DrawerHead;
