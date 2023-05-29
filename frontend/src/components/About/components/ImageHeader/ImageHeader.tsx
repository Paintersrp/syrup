import React, { CSSProperties } from "react";
import { TITLE } from "../../../../config";
import { Media, Text } from "../../../../framework/Base";
import { Flexer } from "../../../../framework/Containers";
import { TextType } from "../../../../framework/Base/Text/Text";

import "./ImageHeader.css";

interface ImageHeaderProps {
  header?: string;
  headerType?: TextType;
  src?: string;
  mb?: CSSProperties["marginBottom"];
  fade?: boolean;
  boxShadow?: boolean;
  imageSize?:
    | "xsmall"
    | "xs"
    | "small"
    | "sm"
    | "medium"
    | "md"
    | "large"
    | "lg"
    | "xlarge"
    | "xl";
}

const ImageHeader: React.FC<ImageHeaderProps> = ({
  header = `About ${TITLE}`,
  headerType = "h2",
  src = "https://source.unsplash.com/1400x900/?service",
  mb: marginBottom = 32,
  fade = false,
  boxShadow = false,
  imageSize = "lg",
}) => {
  return (
    <Flexer
      j="c"
      fd="column"
      className={`${fade ? "fade-in" : ""}`}
      mb={marginBottom}
    >
      {header && (
        <Text t={headerType} a="c" className="image-header-title">
          {header}
        </Text>
      )}
      {src && (
        <Media
          className="image-header-media"
          src={src}
          altText={header}
          size={imageSize}
          boxShadow={boxShadow ? 1 : 0}
        />
      )}
    </Flexer>
  );
};

export default ImageHeader;
