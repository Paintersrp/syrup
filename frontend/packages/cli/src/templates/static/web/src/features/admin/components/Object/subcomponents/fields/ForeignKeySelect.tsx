import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Input, Option, Select } from '@/components/Form';
import React, { useState, ChangeEvent } from 'react';

interface ForeignKeySelectProps {
  formData: any;
  fieldName: string;
  verboseName: string;
  handleInputChange: any;
  choices: Record<string, any>;
}

const ForeignKeySelect: React.FC<ForeignKeySelectProps> = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
}) => {
  const [manualEntry, setManualEntry] = useState(false);
  const toggleManualEntry = () => setManualEntry(!manualEntry);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'create') {
      setManualEntry(true);
    } else {
      setManualEntry(false);
      handleInputChange(event);
    }
  };

  return (
    <Flexer fd="column">
      {manualEntry ? (
        <Input
          id={fieldName}
          onChange={handleInputChange}
          value={
            fieldName === 'social' || fieldName === 'contact_info' || fieldName === 'hero_block'
              ? formData[fieldName]?.id
              : formData[fieldName]
          }
        />
      ) : (
        <Select
          value={
            formData[fieldName] &&
            (fieldName === 'social' ||
              fieldName === 'hero_block' ||
              fieldName === 'page_set' ||
              fieldName === 'contact_info' ||
              fieldName === 'socials' ||
              fieldName === 'hours')
              ? formData[fieldName]?.id
              : formData[fieldName]
          }
          onChange={handleChange}
          name={fieldName}
          style={{ minWidth: '100%', padding: 0 }}
        >
          <Option value={`Select ${verboseName}`}>Select {verboseName}</Option>
          {choices &&
            Object.entries(choices).map(([key, value]: [string, any]) => {
              let optionValue: any;
              let optionText: any;

              if (fieldName === 'servicetier' || fieldName.includes('service_tier')) {
                optionValue = value.service_title;
                optionText = value.service_title;
              } else if (fieldName === 'job') {
                optionValue = value.position;
                optionText = value.position;
              } else if (fieldName === 'user') {
                optionValue = value.username;
                optionText = value.username;
              } else if (fieldName === 'category') {
                optionValue = value.name;
                optionText = value.name;
              } else if (fieldName === 'tags') {
                optionValue = value.detail;
                optionText = value.detail;
              } else if (
                fieldName === 'social' ||
                fieldName === 'contact' ||
                fieldName === 'hero_block' ||
                fieldName === 'question'
              ) {
                optionValue = value.id;
                optionText = value.id;
              } else if (
                fieldName === 'page_set' ||
                fieldName === 'contact_info' ||
                fieldName === 'socials' ||
                fieldName === 'hours'
              ) {
                optionValue = value.set_name;
                optionText = value.set_name;
              } else {
                optionValue = value.id;
                optionText = value.name;
              }

              return (
                <Option key={key} value={optionValue}>
                  {optionText}
                </Option>
              );
            })}
        </Select>
      )}

      <Flexer a="c" j="fe" pt={4}>
        {!fieldName.includes('service_tier') && fieldName !== 'job' && fieldName !== 'user' && (
          <Button style={{ borderRadius: 40 }} onClick={toggleManualEntry}>
            {!manualEntry ? 'Create' : 'Select'}
          </Button>
        )}
      </Flexer>
    </Flexer>
  );
};

export default ForeignKeySelect;
