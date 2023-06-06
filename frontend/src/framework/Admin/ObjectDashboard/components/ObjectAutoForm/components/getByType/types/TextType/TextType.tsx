import React from "react";

import {
  HelpText,
  Input,
  RichTextInput,
} from "../../../../../../../../Components";
import { Flexer, Item } from "../../../../../../../../Containers";

interface TextTypeProps {
  formData: any;
  fieldName: string;
  handleInputChange: any;
  handleQuillChange: any;
  xsColumnCount: number;
  mdColumnCount: number;
  markDownMixin: string;
  helpText?: string;
  min_rows: number;
}

const TextType: React.FC<TextTypeProps> = ({
  formData,
  fieldName,
  handleInputChange,
  handleQuillChange,
  xsColumnCount,
  mdColumnCount,
  markDownMixin,
  helpText,
  min_rows,
}) => {
  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: "center",
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      {markDownMixin === "false" || !markDownMixin ? (
        <Flexer j="fs" fd="column">
          <HelpText>{helpText || "Placeholder Help Text"}</HelpText>
          <Input
            id={fieldName}
            onChange={handleInputChange}
            value={formData[fieldName]}
            multiline
            rows={min_rows}
          />
        </Flexer>
      ) : (
        <Flexer j="fs" fd="column">
          <HelpText>{helpText || "Placeholder Help Text"}</HelpText>
          <RichTextInput
            fieldName={fieldName}
            size="medium"
            value={formData[fieldName]}
            onChange={handleQuillChange}
          />
        </Flexer>
      )}
    </Item>
  );
};

export default TextType;
