import { FC, FormEvent, useEffect, useState } from 'react';

import { Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { axios } from '@/lib/api';
import { useAlertStore } from '@/stores/alert';

import { ConfirmCancelBar } from './ConfirmCancelBar';
import { ManyToManyField } from './ManyToManyField';
import { BaseProps } from '@/theme/base';

interface MTMEditProps extends BaseProps {
  data: any;
  updateData: any;
  handleCancel: any;
  title?: string;
  endpoint?: string;
  id: number | string;
  fieldName: string;
}

export const ManyToManyEdit: FC<MTMEditProps> = ({
  data,
  updateData,
  handleCancel,
  title = 'Edit Process Text Item',
  endpoint = 'processtextitem',
  id,
  fieldName,
  ...rest
}) => {
  const { showAlert } = useAlertStore();

  const [formData, setFormData] = useState<any>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleManyToManyChange = (fieldName: string, fieldValue: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`http://localhost:8000/api/${endpoint}/${id}/`, formData);
      setFormData(res.data);
      updateData(res.data);
      showAlert('success', 'Data Updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface
      maxWidth={1000}
      px={2}
      py={2}
      boxShadow={0}
      br={12}
      j="c"
      outerClass="fade-in"
      {...rest}
    >
      <Text t="h3" a="c">
        {title}
      </Text>
      {formData && (
        <form onSubmit={handleSubmit}>
          <ManyToManyField
            data={formData[fieldName]}
            fieldName={fieldName}
            handleComponentsChange={handleManyToManyChange}
          />
          <ConfirmCancelBar
            handleConfirm={handleSubmit}
            handleCancel={handleCancel}
            position="bottom"
            mt={8}
          />
        </form>
      )}
    </Surface>
  );
};
