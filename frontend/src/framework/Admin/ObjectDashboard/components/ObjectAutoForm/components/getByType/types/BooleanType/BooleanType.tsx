import React from "react";

import { Switch } from "../../../../../../../../Components";
import { Item } from "../../../../../../../../Containers";

interface BooleanTypeProps {
  formData: any;
  fieldName: string;
  verboseName: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  xsColumnCount: number;
  mdColumnCount: number;
  justifyContent: string;
}

const BooleanType: React.FC<BooleanTypeProps> = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  justifyContent,
}) => {
  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "flex-end",
        paddingRight: 8,
        paddingLeft: 8,
        marginTop: 16,
        order: 1000,
      }}
    >
      <Switch
        name={fieldName}
        onChange={handleInputChange}
        value={formData ? formData[fieldName] : ""}
        label={verboseName}
      />
    </Item>
  );
};

export default BooleanType;
