import React, { useEffect, useState } from 'react';

import { ConfirmCancelBar } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { BaseProps } from '@/theme/base';
import { RichTextInput } from '@/components/Form';
import { axios } from '@/lib/api';

import { ParagraphType } from '../types';

interface ParagraphEditProps extends BaseProps {
  content: ParagraphType;
  onUpdate: any;
  type: string | undefined;
  handleCancel: any;
}

export const ParagraphEdit: React.FC<ParagraphEditProps> = ({
  content,
  onUpdate,
  type,
  handleCancel,
  ...rest
}) => {
  const [contentType, setContentType] = useState<string | undefined>('');
  const [data, setData] = useState<ParagraphType>(content);
  const [title, setTitle] = useState<string>(content.title);
  const [body, setBody] = useState<string>(content.body);

  useEffect(() => {
    setContentType(type);
  }, []);

  const handleBody = (value: string) => {
    setBody(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);

    if (body === '<p><br></p>' || body === null) {
      formData.append('body', '');
    } else {
      formData.append('body', body);
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${contentType}/${content.id}/`,
        formData
      );
      const updatedData: ParagraphType = response.data;
      setData(updatedData);
      onUpdate(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flexer fd="column" j="c" className="fade-in" {...rest}>
      <div style={{ marginTop: 8 }}>
        <RichTextInput value={body} onChange={handleBody} />
      </div>
      <ConfirmCancelBar
        handleConfirm={handleSubmit}
        handleCancel={handleCancel}
        position="bottom"
      />
    </Flexer>
  );
};
