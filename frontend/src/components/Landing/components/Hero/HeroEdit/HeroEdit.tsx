import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormGenerator } from "../../../../../framework/Base";
import { ApiAxiosInstance } from "../../../../../utils";

const HeroEdit = ({ heroBlock, onUpdate, handleCancel }) => {
  const [state, setState] = useState({ ...heroBlock });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await ApiAxiosInstance.patch(`heroblock/main/`, state);
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormGenerator
      title="Edit Hero Block"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={state}
      width="75%"
      excludeKeys={["name", "id"]}
      multilineKeys={["text"]}
      handleSwitchChange={handleSwitchChange}
      handleCancel={handleCancel}
    />
  );
};

export default HeroEdit;
