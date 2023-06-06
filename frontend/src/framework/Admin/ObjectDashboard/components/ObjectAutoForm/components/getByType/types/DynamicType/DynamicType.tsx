import React, { ChangeEvent } from "react";

import { HelpText, IconMixin, Input } from "../../../../../../../../Components";
import { Flexer, Item } from "../../../../../../../../Containers";

interface DynamicTypeProps {
  type: string;
  formData: any;
  fieldName: string;
  handleInputChange: (event: ChangeEvent<any>) => void;
  xsColumnCount: number;
  mdColumnCount: number;
  justifyContent?: string;
  helpText?: string;
}

const DynamicType: React.FC<DynamicTypeProps> = ({
  type,
  formData,
  fieldName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  justifyContent = "center",
  helpText,
}) => {
  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "center",
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      {fieldName.includes("icon") ? (
        <Flexer j="fs" fd="column">
          <IconMixin
            fieldName={fieldName}
            formData={formData}
            handleChange={handleInputChange}
            background="#F5F5F5"
          />
        </Flexer>
      ) : (
        <Flexer j="fs" fd="column">
          <HelpText>{helpText ? helpText : "\u00A0"}</HelpText>
          <Input
            id={fieldName}
            onChange={handleInputChange}
            value={
              type.includes("Date")
                ? new Date(formData[fieldName]).toLocaleString()
                : formData[fieldName]
            }
          />
        </Flexer>
      )}
    </Item>
  );
};

export default DynamicType;
