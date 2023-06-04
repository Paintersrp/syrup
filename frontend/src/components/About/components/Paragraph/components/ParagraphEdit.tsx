import React, { useEffect, useState } from "react";

import {
  BaseProps,
  ConfirmCancelBar,
  Flexer,
  RichTextInput,
} from "../../../../../framework";
import { ApiAxiosInstance } from "../../../../../utils";

interface Content {
  id: number;
  title: string;
  body: string;
}

interface ParagraphEditProps extends BaseProps {
  content: Content;
  onUpdate: any;
  type: string | undefined;
  handleCancel: any;
}

const ParagraphEdit: React.FC<ParagraphEditProps> = ({
  content,
  onUpdate,
  type,
  handleCancel,
  ...rest
}) => {
  const [contentType, setContentType] = useState<string | undefined>("");
  const [data, setData] = useState<Content>(content);
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
    formData.append("title", title);

    if (body === "<p><br></p>" || body === null) {
      formData.append("body", "");
    } else {
      formData.append("body", body);
    }

    try {
      const response = await ApiAxiosInstance.patch(
        `http://localhost:8000/api/${contentType}/${content.id}/`,
        formData
      );
      const updatedData: Content = response.data;
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

export default ParagraphEdit;
