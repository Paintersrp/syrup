import React from "react";

import { palettes } from "../../../utils/theming/theme";
import { Flexer } from "../../Containers";
import Divider from "../Divider/Divider";
import MaterialIcon from "../Icon/MaterialIcon";
import Text from "../Text/Text";

interface IconTextItemProps {
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
}) => {
  return (
    <>
      <Flexer w="auto">
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
    </>
  );
};

export default IconTextItem;
