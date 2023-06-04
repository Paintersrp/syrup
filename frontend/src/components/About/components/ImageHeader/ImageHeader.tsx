import React, { CSSProperties } from "react";
import "./ImageHeader.css";

import {
  BaseProps,
  Flexer,
  Media,
  Text,
  TextType,
} from "../../../../framework";
import { TITLE } from "../../../../settings";

interface ImageHeaderProps extends BaseProps {
  header?: string;
  headerType?: TextType;
  src?: string;
  mb?: CSSProperties["marginBottom"];
  fade?: boolean;
  boxShadow?: boolean;
}

const ImageHeader: React.FC<ImageHeaderProps> = ({
  header = `About ${TITLE}`,
  headerType = "h2",
  src = "https://source.unsplash.com/1400x900/?service",
  mb: marginBottom = 32,
  fade = false,
  boxShadow = false,
  ...rest
}) => {
  return (
    <Flexer
      j="c"
      fd="column"
      className={`${fade ? "fade-in" : ""}`}
      mb={marginBottom}
      {...rest}
    >
      {header && (
        <Text t={headerType} a="c" className="image-header-title">
          {header}
        </Text>
      )}
      <div style={{ width: "100%" }}>
        {src && (
          <Media
            className="image-header-media"
            src={src}
            altText={header}
            boxShadow={boxShadow ? 1 : 0}
          />
        )}
      </div>
    </Flexer>
  );
};

export default ImageHeader;
