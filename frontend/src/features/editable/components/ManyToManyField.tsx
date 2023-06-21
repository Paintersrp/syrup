import React, { useEffect, useState } from 'react';

import { axios } from '@/lib/api';
import { choiceSource } from '@/utils';
import { TransferList } from './TransferList';

interface ManyToManyFieldProps {
  data?: any;
  fieldName: string;
  handleComponentsChange: (fieldName: string, fieldValue: any) => void;
}

export const ManyToManyField: React.FC<ManyToManyFieldProps> = ({
  data = {},
  fieldName,
  handleComponentsChange,
}) => {
  const [choices, setChoices] = useState<any[]>([]);

  useEffect(() => {
    const source = choiceSource(fieldName);

    axios.get(`/${source}/`).then((response) => {
      setChoices(response.data);
    });
  }, [fieldName]);

  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    data && data.length ? data.map((item: any) => item) : []
  );

  return (
    <div style={{ width: '100%' }}>
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
