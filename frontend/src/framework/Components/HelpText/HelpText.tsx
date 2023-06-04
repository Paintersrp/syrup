import React, { ReactNode, CSSProperties, FC } from "react";

import Text, { AlignmentValue, TextProps } from "../../Components/Text/Text";

interface HelpTextProps extends TextProps {
  children: ReactNode;
  a?: AlignmentValue;
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  style?: CSSProperties;
}

const HelpText: FC<HelpTextProps> = ({
  children,
  mt = 8,
  mb = 4,
  style,
  ...rest
}) => {
  return (
    <Text
      mt={mt}
      mb={mb}
      {...rest}
      style={{ ...style, color: "#626262", padding: 0 }}
    >
      {children}
    </Text>
  );
};

export default HelpText;
