import React from "react";
import { TITLE } from "../../../../../settings";
import { Media, Text } from "../../../../Base";
import { Flexer } from "../../../../Containers";
import "./ImageHeader.css";

interface ImageHeaderProps {
  // Add your prop types here
}

const ImageHeader: React.FC<ImageHeaderProps> = ({}) => {
  return (
    <Flexer j="c" fd="column" className="fade-in" mt={16}>
      <Text t="h2" a="c" className="image-header-title">
        About {TITLE}
      </Text>
      <Media
        className="image-header-media"
        src="https://source.unsplash.com/1400x900/?service"
        altText={`About ${TITLE}`}
        size="medium"
      />
    </Flexer>
  );
};

export default ImageHeader;
