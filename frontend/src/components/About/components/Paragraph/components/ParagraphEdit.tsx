import React, { useEffect, useState } from "react";
import { Input } from "../../../../../framework/Base";
import RichTextInput from "../../../../../framework/Base/RichTextInput/RichTextInput";
import { Flexer } from "../../../../../framework/Containers";
import { ConfirmCancelBar } from "../../../../../framework/Prebuilt";

import { ApiAxiosInstance } from "../../../../../utils";

const ParagraphEdit = ({ content, onUpdate, type, handleCancel }) => {
  const [contentType, setContentType] = useState([]);
  const [data, setData] = useState(content);
  const [title, setTitle] = useState(content.title);
  const [body, setBody] = useState(content.body);

  useEffect(() => {
    setContentType(type);
  }, []);

  const handleBody = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);

    if (body === "<p><br></p>" || body === null) {
      formData.append("body", "");
    } else {
      formData.append("body", body);
    }

    try {
      await ApiAxiosInstance.patch(
        `http://localhost:8000/api/${contentType}/1/`,
        formData
      ).then((res) => {
        setData(res.data);
        onUpdate(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flexer fd="column" j="c" className="fade-in">
      {/* <Input
        name="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      /> */}
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