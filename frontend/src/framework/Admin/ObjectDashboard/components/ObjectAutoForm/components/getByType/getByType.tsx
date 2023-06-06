import React from "react";

import {
  BooleanType,
  ChoiceType,
  DynamicType,
  FileType,
  ForeignKeyType,
  ImageType,
  ManyToManyType,
  TextType,
} from "./types";

interface GetByTypeProps {
  fieldMetadata: any;
  fieldName: string;
  modelMetadata: any;
  verboseName: string;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: any;
  handleManyToManyChange: (fieldName: string, selectedOptions: any[]) => void;
  handleImageChange: (fieldName: string, file: File) => void;
  handleQuillChange: (fieldName: string, value: string) => void;
  handleComponentsChange: (fieldName: string, selectedOptions: any[]) => void;
  handleModelNameChange: (modelName: string) => void;
  handleModalUpdate?: () => void;
  newImage: File | null;
  newImageName: string | null;
}

const getByType: React.FC<GetByTypeProps> = ({
  fieldMetadata,
  fieldName,
  modelMetadata,
  verboseName,
  formData,
  setFormData,
  handleInputChange,
  handleManyToManyChange,
  handleImageChange,
  handleQuillChange,
  handleComponentsChange,
  handleModelNameChange,
  handleModalUpdate,
  newImage,
  newImageName,
}) => {
  const {
    type,
    choices,
    xs_column_count,
    md_column_count,
    justify,
    markdown,
    help_text,
    min_rows,
  } = fieldMetadata[fieldName];

  console.log(type);

  switch (type) {
    case "BooleanField":
      return (
        <BooleanType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          justifyContent={justify}
        />
      );
    case "CharField":
    case "EmailField":
    case "URLField":
    case "SlugField":
    case "DateTimeField":
    case "IntegerField":
    case "PositiveIntegerField":
    case "PositiveSmallIntegerField":
    case "SmallIntegerField":
    case "BigIntegerField":
    case "DecimalField":
    case "FloatField":
      return (
        <DynamicType
          type={type}
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          justifyContent={justify}
          helpText={help_text}
        />
      );
    case "StringRelatedField":
      return (
        <ForeignKeyType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          helpText={help_text}
        />
      );
    case "TextField":
      return (
        <TextType
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
          handleQuillChange={handleQuillChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          markDownMixin={markdown}
          helpText={help_text}
          min_rows={min_rows}
        />
      );
    case "ListSerializer":
      return (
        <ManyToManyType
          formData={formData}
          setFormData={setFormData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleManyToManyChange={handleManyToManyChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          helpText={help_text}
          handleComponentsChange={handleComponentsChange}
          modelMetadata={modelMetadata}
        />
      );
    case "ImageField":
      return (
        <ImageType
          formData={formData}
          handleImageChange={handleImageChange}
          newImage={newImage}
          newImageName={newImageName ? newImageName : ""}
        />
      );
    case "ChoiceField":
    case "PrimaryKeyRelatedField":
      return (
        <ChoiceType
          fieldType={type}
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          choices={choices}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
          helpText={help_text}
          handleModelNameChange={handleModelNameChange}
        />
      );
    case "FileField":
      return (
        <FileType
          formData={formData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleInputChange={handleInputChange}
          xsColumnCount={xs_column_count}
          mdColumnCount={md_column_count}
        />
      );
    default:
      if (type.includes("Serializer")) {
        return (
          <ForeignKeyType
            formData={formData}
            fieldName={fieldName}
            verboseName={verboseName}
            handleInputChange={handleInputChange}
            xsColumnCount={xs_column_count}
            mdColumnCount={md_column_count}
            helpText={help_text}
          />
        );
      }
      return null;
  }
};

export default getByType;
