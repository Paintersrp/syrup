import React, { ReactNode, CSSProperties, FC } from "react";
import { Text } from "../../../Base";
import { AlignmentValue } from "../../../Base/Text/Text";

interface HelpTextProps {
  children: ReactNode;
  a?: AlignmentValue;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  w?: CSSProperties["width"];
  style?: CSSProperties;
}

const HelpText: FC<HelpTextProps> = ({
  children,
  a = "l",
  mt = 8,
  mb = 4,
  mr = 0,
  ml = 0,
  w = "100%",
  style,
}) => {
  return (
    <Text
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      a={a}
      w={w}
      style={{ ...style, color: "#626262", padding: 0 }}
    >
      {children}
    </Text>
  );
};

export default HelpText;
