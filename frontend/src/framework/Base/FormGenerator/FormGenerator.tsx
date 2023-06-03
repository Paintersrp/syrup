import React, { useState, CSSProperties, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { Input, Text, validateForm } from "..";
import { ApiAxiosInstance } from "../../../utils";
import { ConfirmCancelBar } from "../../Prebuilt";
import IconMixin from "./mixins/IconMixin/IconMixin";
import ImageMixin from "./mixins/ImageMixin/ImageMixin";
import { Container, Item, Surface } from "../../Containers";
import ErrorDisplay from "../../Prebuilt/UI/Errors/ErrorDisplay/ErrorDisplay";

type ValidationErrors = {
  [key: string]: string;
};

interface FormGeneratorProps {
  endpoint: string;
  data: any;
  onUpdate: any;
  title?: string;
  handleCancel: () => void;
  handleManyToManyChange?: () => void;
  width?: CSSProperties["width"];
  excludeKeys?: string[];
  multilineKeys?: string[];
  smallKeys?: string[];
  titleBlockMixin?: boolean;
  iconMixin?: boolean;
  imageMixin?: boolean;
  boxShadow?: boolean;
  placement?: "top" | "right" | "bottom" | "left";
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  fade?: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  endpoint,
  data,
  onUpdate,
  title,
  handleCancel,
  handleManyToManyChange,
  width = "100%",
  excludeKeys = [],
  multilineKeys = [],
  smallKeys = [],
  titleBlockMixin = false,
  iconMixin = false,
  imageMixin = false,
  boxShadow = false,
  placement = "bottom",
  mt: marginTop = 2,
  mb: marginBottom = 2,
  px: paddingX = 3,
  py: paddingY = 0,
  fade = false,
}) => {
  const [errors, setErrors] = useState<any>(null);
  const [state, setState] = useState({ ...data });
  const [newImage, setNewImage] = useState<any>(null);
  const [newImageName, setNewImageName] = useState<any>(null);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    if (e.target.name === "image") {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
      setNewImage(URL.createObjectURL(e.target.files[0]));
      setNewImageName(e.target.files[0].name);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSwitchChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateForm(state));

    if (errors.length !== 0) {
      return errors;
    }

    try {
      const res = await ApiAxiosInstance.patch(endpoint, state);
      onUpdate(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface
      boxShadow={boxShadow ? 1 : 0}
      px={paddingX}
      py={paddingY}
      mt={marginTop}
      mb={marginBottom}
      br={1}
      style={{ margin: "0 auto !important", width: width }}
      className={`${fade ? "fade-in" : ""}`}
    >
      {title ? (
        <Text t="h4" fw="bold" mb={12} a="c">
          {title}
        </Text>
      ) : null}
      <form onSubmit={handleSubmit}>
        {imageMixin ? (
          <ImageMixin
            handleChange={handleChange}
            formData={state}
            newImage={newImage}
            newImageName={newImageName}
          />
        ) : null}
        <Container>
          {Object.keys(state).map((key) => {
            if (!excludeKeys.includes(key)) {
              return (
                <Item
                  key={key}
                  xs={12}
                  sm={!smallKeys.includes(key) ? 12 : 6}
                  style={{ marginTop: 4 }}
                >
                  <Input
                    size="medium"
                    id={key}
                    name={key}
                    value={state[key]}
                    onChange={handleChange}
                    multiline={multilineKeys.includes(key)}
                    helpText={
                      key === "who_we_are"
                        ? "Who We Are"
                        : key === "looking_for"
                        ? "Looking For"
                        : key === "why_apply"
                        ? "Why Apply"
                        : key === "firstName"
                        ? "First Name"
                        : key === "lastName"
                        ? "Last Name"
                        : key.charAt(0).toUpperCase() + key.slice(1)
                    }
                  />
                </Item>
              );
            }
          })}
        </Container>
        {/* {titleBlockMixin ? (
            <>
              <TitleBlockMixin
                handleChange={handleChange}
                formData={formData}
              />
            </>
          ) : null}*/}
        {iconMixin && (
          <IconMixin
            fieldName="icon"
            handleChange={handleChange}
            formData={state}
          />
        )}
        <ConfirmCancelBar
          handleConfirm={handleSubmit}
          handleCancel={handleCancel}
          position={placement}
          mt={8}
        />
      </form>
      {errors && <ErrorDisplay errors={errors} setErrors={setErrors} />}
    </Surface>
  );
};

export default FormGenerator;
