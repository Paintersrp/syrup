import React, { ChangeEvent } from "react";
import "./ImageInput.css";

import { BaseProps, Flexer } from "../../Containers";
import Button from "../Button/Button";
import Text from "../Text/Text";

interface ImageInputProps extends BaseProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newImage: string | null;
  newImageName: string | null;
  type?: string;
  dense?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  handleChange,
  newImage,
  newImageName,
  type = "Image",
  dense = false,
  ...rest
}) => {
  const handleSelectFile = (e: any) => {
    e.preventDefault();
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <Flexer j="c" {...rest}>
      <Button
        onClick={(e) => handleSelectFile(e)}
        className={`input-button${dense ? "-dense" : ""}`}
        startIcon="upload"
        iconSize={dense ? "16px" : "18px"}
      >
        <Text t="subtitle1" a="c" s={dense ? "0.85rem" : "0.95rem"}>
          {!newImage ? `Select New ${type}` : newImageName}
        </Text>
      </Button>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="file-input"
        name="image"
        type="file"
        onChange={handleChange}
      />
    </Flexer>
  );
};

export default ImageInput;