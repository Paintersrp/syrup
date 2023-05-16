import React from "react";
import Text from "../../Base/Text/Text";

export default function HelpText({
  children,
  a = "l",
  mt = 8,
  mb = 4,
  mr = 0,
  ml = 0,
  w = "100%",
  style,
}) {
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
}
