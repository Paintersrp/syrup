import { Button } from '@/components/Buttons';
import { Flexer, Item } from '@/components/Containers';
import { HelpText } from '@/components/Elements';
import { Input, Option, Select } from '@/components/Form';
import React, { ChangeEvent, useState } from 'react';

interface ChoiceTypeProps {
  fieldType: string;
  formData: any;
  fieldName: string;
  verboseName: string;
  handleInputChange: (event: ChangeEvent<any>) => void;
  choices: any[];
  xsColumnCount: number;
  mdColumnCount: number;
  helpText: string;
  handleModelNameChange: (modelName: string) => void;
}

const ChoiceType: React.FC<ChoiceTypeProps> = ({
  fieldType,
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
  xsColumnCount,
  mdColumnCount,
  helpText,
  handleModelNameChange,
}) => {
  console.log(choices);
  const [manualEntry, setManualEntry] = useState(false);
  const toggleManualEntry = () => setManualEntry(!manualEntry);

  const handleChange = (event: ChangeEvent<any>) => {
    const selectedValue = event.target.value;
    const selectedChoice = choices.find((choice) => choice.value === selectedValue);

    handleInputChange(event);
    handleModelNameChange(selectedChoice ? selectedChoice.model_name : 'None');
  };

  return (
    <Item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        width: '100%',
      }}
    >
      <Flexer fd="column">
        <Flexer fd="column">
          <HelpText>{helpText || verboseName}</HelpText>
          {manualEntry ? (
            <Input id={fieldName} onChange={handleChange} value={formData[fieldName]} />
          ) : (
            <Select
              value={formData[fieldName]}
              onChange={handleChange}
              name={fieldName}
              style={{ minWidth: '100%', padding: 0 }}
            >
              {choices
                ? Object.entries(fieldName === 'content' ? choices : choices[0]).map(
                    ([key, value]: any) => {
                      if (fieldName === 'content' && !value.model_name) {
                        return null;
                      }

                      return (
                        <Option key={key} value={value.value}>
                          {fieldName === 'content' ? value.model_name : value.display}
                        </Option>
                      );
                    }
                  )
                : null}
            </Select>
          )}
        </Flexer>
        {fieldType === 'PrimaryKeyRelatedField' &&
          fieldName !== 'seo_data' &&
          fieldName !== 'content_type' && (
            <Flexer j="fe" a="c" mt={4}>
              <Button style={{ borderRadius: 40 }} onClick={toggleManualEntry}>
                {!manualEntry ? 'Create' : 'Select'}
              </Button>
            </Flexer>
          )}
      </Flexer>
    </Item>
  );
};

export default ChoiceType;
