import React, { ChangeEvent } from "react";
import { Flexer } from "../../../../Containers";
import HelpText from "../../../HelpText/HelpText";
import MaterialIcon, { ICON_OPTIONS } from "../../../Icon/MaterialIcon";
import Select, { Option } from "../../../Select/Select";
import Text from "../../../Text/Text";

interface IconMixin {
  fieldName?: string;
  handleChange: any;
  formData: any;
  background?: string;
}

const IconMixin: React.FC<IconMixin> = ({
  fieldName,
  handleChange,
  formData,
  background = "#F5F5F5",
}) => {
  return (
    <React.Fragment>
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
        <Option value="Select an icon">Select an icon</Option>
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
