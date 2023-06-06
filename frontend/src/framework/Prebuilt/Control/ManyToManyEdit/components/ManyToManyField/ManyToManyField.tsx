import React, { useEffect, useState } from "react";

import { ApiAxiosInstance, choiceSource } from "../../../../../../utils";
import TransferList from "../TransferList/TransferList";

interface Props {
  data?: any;
  fieldName: string;
  handleComponentsChange: (fieldName: string, fieldValue: any) => void;
}

const ManyToManyField: React.FC<Props> = ({
  data = {},
  fieldName,
  handleComponentsChange,
}) => {
  const [choices, setChoices] = useState<any[]>([]);

  useEffect(() => {
    const source = choiceSource(fieldName);

    ApiAxiosInstance.get(`/${source}/`).then((response) => {
      setChoices(response.data);
    });
  }, [fieldName]);

  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    data && data.length ? data.map((item: any) => item) : []
  );

  return (
    <div style={{ width: "100%" }}>
      {choices && selectedOptions && (
        <TransferList
          fieldName={fieldName}
          selectedOptions={selectedOptions}
          choices={choices}
          handleComponentsChange={handleComponentsChange}
        />
      )}
    </div>
  );
};

export default ManyToManyField;
