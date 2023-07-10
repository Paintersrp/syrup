import React from 'react';
import { Flexer, HelpText, Icon, ICON_OPTIONS, Option, Select, Text } from 'sy-core';

interface IconMixinType {
  fieldName?: string;
  handleChange: any;
  formData: any;
  background?: string;
}

export const IconMixin: React.FC<IconMixinType> = ({
  fieldName,
  handleChange,
  formData,
  background = '#F5F5F5',
}) => {
  return (
    <React.Fragment>
      <HelpText mt={4} mb={0}>
        Select an Icon
      </HelpText>
      <Select
        dense
        value={fieldName ? formData[fieldName] || formData.icon : formData.icon}
        onChange={handleChange}
        name={fieldName}
        iconMixin
        style={{
          minWidth: '100%',
          background: background,
          borderRadius: 4,
        }}
      >
        {ICON_OPTIONS.map((icon) => (
          <Option key={`icon-${icon.id}`} value={icon.name} dense>
            <Flexer>
              <Icon size="20px" icon={icon.name} mr={12} />
              <Text a="l">{icon.name}</Text>
            </Flexer>
          </Option>
        ))}
      </Select>
    </React.Fragment>
  );
};
