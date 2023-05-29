import React, { FormEvent, ChangeEvent } from "react";

import { Input, Text } from "..";
import { Container, Flexer, Item, Surface } from "../../Containers";
import { ConfirmCancelBar } from "../../Prebuilt";

interface FormGeneratorProps {
  title?: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleCancel: () => void;
  handleManyToManyChange?: () => void;
  formData: any;
  width?: string;
  excludeKeys?: string[];
  multilineKeys?: string[];
  smallKeys?: string[];
  titleBlockMixin?: boolean;
  iconMixin?: boolean;
  imageMixin?: boolean;
  newImage?: string;
  newImageName?: string;
  boxShadow?: boolean;
  fadeIn?: boolean;
  placement?: "top" | "right" | "bottom" | "left";
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  title,
  handleSubmit,
  handleChange,
  handleCancel,
  handleManyToManyChange,
  formData,
  width = "100%",
  excludeKeys = [],
  multilineKeys = [],
  smallKeys = [],
  titleBlockMixin = false,
  iconMixin = false,
  imageMixin = false,
  newImage = "",
  newImageName = "",
  boxShadow = false,
  fadeIn = true,
  placement = "bottom",
  mt: marginTop = 3,
  mb: marginBottom = 3,
  px: paddingX = 3,
  py: paddingY = 3,
}) => {
  return (
    <Flexer
      fd="column"
      className={fadeIn ? "fade-in" : ""}
      mt={marginTop}
      mb={marginBottom}
    >
      <Surface
        boxShadow={boxShadow ? 1 : 0}
        px={paddingX}
        py={paddingY}
        br={1.25}
        style={{ margin: "0 auto !important", width: width }}
      >
        {title ? (
          <Text t="h4" fw="bold" mb={12} a="c">
            {title}
          </Text>
        ) : null}
        <form onSubmit={handleSubmit}>
          {/* {imageMixin ? (
            <ImageEditMixin
              handleChange={handleChange}
              formData={formData}
              newImage={newImage}
              newImageName={newImageName}
            />
          ) : null} */}
          <Container>
            {Object.keys(formData).map((key) => {
              if (!excludeKeys.includes(key)) {
                return (
                  <Item
                    xs={12}
                    sm={!smallKeys.includes(key) ? 12 : 6}
                    style={{ padding: "0px 4px" }}
                  >
                    <Input
                      key={key}
                      id={key}
                      name={key}
                      value={formData[key]}
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
          ) : null}
          {iconMixin ? (
            <IconSelectMixin handleChange={handleChange} formData={formData} />
          ) : null} */}

          <ConfirmCancelBar
            handleConfirm={handleSubmit}
            handleCancel={handleCancel}
            position={placement}
            mt={8}
          />
        </form>
      </Surface>
    </Flexer>
  );
};

export default FormGenerator;
