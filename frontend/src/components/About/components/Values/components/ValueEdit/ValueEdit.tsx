import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { FormGenerator } from "../../../../../../framework/Base";
import { ApiAxiosInstance } from "../../../../../../utils";
import { ValueType } from "../../Values";

interface ValueEditProps {
  value: ValueType;
  onUpdate: (updateValue: ValueType) => void;
  handleCancel: () => void;
}

const ValueEdit: React.FC<ValueEditProps> = ({
  value,
  onUpdate,
  handleCancel,
}) => {
  const [formData, setFormData] = useState<ValueType>(value);
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await ApiAxiosInstance.patch<ValueType>(
        `http://localhost:8000/api/value/${formData.id}/`,
        formData
      );
      console.log(res.data);
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormGenerator
      title="Edit"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      width="90%"
      excludeKeys={["id", "icon"]}
      handleCancel={handleCancel}
      iconMixin
      px={1.5}
      py={1.5}
      boxShadow
      placement="top"
    />
  );
};

export default ValueEdit;
