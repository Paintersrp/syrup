import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextInputProps {
  fieldName?: string;
  value: string;
  onChange: (value: string | { fieldName: string; fieldValue: any }) => void;
  modules?: Record<string, any>;
  formats?: string[];
  size?: "small" | "medium" | "large";
}

const modules = {
  toolbar: [
    [{ header: [3, 4, 5, 6, true] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const RichTextInput: React.FC<RichTextInputProps> = ({
  fieldName,
  value,
  onChange,
  modules = {},
  formats = [],
  size = "small",
}) => {
  const [content, setContent] = useState<string>(value);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (value: string) => {
    setContent(value);
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  const handleAdminChange = (fieldValue: string) => {
    setContent(fieldValue);
    if (typeof onChange === "function" && fieldName) {
      onChange({ fieldName, fieldValue });
    }
  };

  return (
    <div className="rte-root">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={fieldName ? handleAdminChange : handleChange}
        modules={modules}
        formats={formats}
        className={
          size === "small"
            ? "rte-size-small"
            : size === "medium"
            ? "rte-size-medium"
            : size === "large"
            ? "rte-size-large"
            : "rte-size-default"
        }
      />
    </div>
  );
};

RichTextInput.defaultProps = {
  modules: {
    toolbar: [
      [{ header: [3, 4, 5, 6, true] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "font",
    "align",
    "size",
    "color",
    "background",
    "clean",
  ],
};

export default RichTextInput;
