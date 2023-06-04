import React from "react";

import { BaseProps, Flexer } from "../../Containers";
import MaterialIcon from "../Icon/MaterialIcon";
import { palettes } from "../../../utils";
import Divider from "../Divider/Divider";
import Text from "../Text/Text";

interface IconTextItemProps extends BaseProps {
  icon: string;
  text?: string;
  subtext?: string;
  iconColor?: string;
  subtextColor?: string;
  divider?: boolean;
}

const IconTextItem: React.FC<IconTextItemProps> = ({
  icon,
  text,
  subtext,
  iconColor,
  subtextColor = palettes.text.secondary,
  divider,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Flexer w="auto" {...rest}>
        {icon && <MaterialIcon icon={icon} mr={6} color={iconColor} />}
        <Flexer fd="column" style={{ marginRight: 30 }}>
          {text && <Text a="c">{text}</Text>}
          {subtext && (
            <Text a="c" c={subtextColor}>
              {subtext}
            </Text>
          )}
        </Flexer>
      </Flexer>
      {divider && <Divider mt={6} mb={6} />}
    </React.Fragment>
  );
};

export default IconTextItem;
