import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ConfirmCancelBar from "../ConfirmCancelBar/ConfirmCancelBar";
import { BaseProps, Surface } from "../../../Containers";
import { ApiAxiosInstance } from "../../../../utils";
import { ManyToManyField } from "./components";
import { Text } from "../../../Components";

interface MTMEditProps extends BaseProps {
  data: any;
  updateData: any;
  handleCancel: any;
  title?: string;
  endpoint?: string;
  id: number;
  fieldName: string;
}

const ManyToManyEdit: React.FC<MTMEditProps> = ({
  data,
  updateData,
  handleCancel,
  title = "Edit Process Text Item",
  endpoint = "processtextitem",
  id,
  fieldName,
  ...rest
}) => {
  const dispatch = useDispatch();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await ApiAxiosInstance.patch(
        `http://localhost:8000/api/${endpoint}/${id}/`,
        formData
      );
      setFormData(res.data);
      updateData(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
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

export default ManyToManyEdit;
