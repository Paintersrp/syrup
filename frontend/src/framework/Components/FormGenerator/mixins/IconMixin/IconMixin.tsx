import React from "react";

import MaterialIcon, { ICON_OPTIONS } from "../../../Icon/MaterialIcon";
import HelpText from "../../../HelpText/HelpText";
import { Flexer } from "../../../../Containers";
import Select from "../../../Select/Select";
import Option from "../../../Option/Option";
import Text from "../../../Text/Text";

interface IconMixinType {
  fieldName?: string;
  handleChange: any;
  formData: any;
  background?: string;
}

const IconMixin: React.FC<IconMixinType> = ({
  fieldName,
  handleChange,
  formData,
  background = "#F5F5F5",
}) => {
  return (
    <React.Fragment>
      <HelpText mt={4} mb={0}>
        Select an Icon
      </HelpText>
      <Select
        value={fieldName ? formData[fieldName] || formData.icon : formData.icon}
        onChange={handleChange}
        name={fieldName}
        iconMixin
        style={{
          minWidth: "100%",
          background: background,
          borderRadius: 4,
        }}
      >
        {ICON_OPTIONS.map((icon) => (
          <Option key={`icon-${icon.id}`} value={icon.name}>
            <Flexer>
              <MaterialIcon size="20px" icon={icon.name} mr={12} />
              <Text a="l">{icon.name}</Text>
            </Flexer>
          </Option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default IconMixin;
