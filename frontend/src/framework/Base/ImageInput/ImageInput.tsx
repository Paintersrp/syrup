import React, { ChangeEvent } from "react";
import "./ImageInput.css";

import { Flexer } from "../../Containers";
import Button from "../Button/Button";
import MaterialIcon from "../Icon/MaterialIcon";
import Text from "../Text/Text";

interface ImageInputProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newImage: string | null;
  newImageName: string | null;
  type?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  handleChange,
  newImage,
  newImageName,
  type = "Image",
}) => {
  const handleSelectFile = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <Flexer j="c">
      <Button
        onClick={handleSelectFile}
        className="input-button"
        endIcon="upload"
      >
        <Text
          t="subtitle1"
          a="c"
          style={{
            cursor: "pointer",
          }}
        >
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
