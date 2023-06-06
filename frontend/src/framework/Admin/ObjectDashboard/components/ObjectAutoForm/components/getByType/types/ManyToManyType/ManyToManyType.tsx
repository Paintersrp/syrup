import React from "react";

import { ManyToManyField } from "../../../../../../../../Prebuilt";
import { Flexer, Item } from "../../../../../../../../Containers";
import { HelpText } from "../../../../../../../../Components";

interface ManyToManyTypeProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  fieldName: string;
  verboseName: string;
  handleManyToManyChange: any;
  handleComponentsChange: any;
  xsColumnCount?: number;
  mdColumnCount?: number;
  helpText?: string;
  modelMetadata: any;
}

const ManyToManyType: React.FC<ManyToManyTypeProps> = ({
  formData,
  setFormData,
  fieldName,
  verboseName,
  handleManyToManyChange,
  handleComponentsChange,
  xsColumnCount = 12,
  mdColumnCount = 12,
  helpText,
  modelMetadata,
}) => {
  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        order: 999,
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <Flexer fd="column">
        {fieldName !== "components" && (
          <HelpText>{helpText || verboseName}</HelpText>
        )}
        <ManyToManyField
          data={formData[fieldName]}
          fieldName={fieldName}
          handleComponentsChange={handleComponentsChange}
        />
      </Flexer>
    </Item>
  );
};

export default ManyToManyType;
