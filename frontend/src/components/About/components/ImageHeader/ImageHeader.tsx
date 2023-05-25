import React from "react";
import { TITLE } from "../../../../config";
import { Media, Text } from "../../../../framework/Base";
import { Flexer } from "../../../../framework/Containers";

import "./ImageHeader.css";

interface ImageHeaderProps {
  // Add your prop types here
}

const ImageHeader: React.FC<ImageHeaderProps> = ({}) => {
  return (
    <Flexer j="c" fd="column" className="fade-in" mb={32}>
      <Text t="h2" a="c" className="image-header-title">
        About {TITLE}
      </Text>
      <Media
        className="image-header-media"
        src="https://source.unsplash.com/1400x900/?service"
        altText={`About ${TITLE}`}
        size="lg"
        boxShadow={1}
      />
    </Flexer>
  );
};

export default ImageHeader;
