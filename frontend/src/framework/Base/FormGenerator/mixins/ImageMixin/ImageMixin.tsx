import React, { useState } from "react";
import { ImageHeader } from "../../../../../components";
import { Container, Item } from "../../../../Containers";
import ImageInput from "../../../ImageInput/ImageInput";
import { MediaSizes } from "../../../Media/Media";

interface ImageMixinProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: { image: string };
  newImage: string | null;
  newImageName: string;
  soloImageSize?: MediaSizes;
  dualImageSize?: MediaSizes;
}

const ImageMixin: React.FC<ImageMixinProps> = ({
  handleChange,
  formData,
  newImage,
  newImageName,
  soloImageSize = "mini",
  dualImageSize = "mini",
}) => {
  const [image, setImage] = useState(formData.image);
  return (
    <>
      <Container>
        {!newImage && image && (
          <ImageHeader
            header="Current Image"
            headerType="h4"
            src={image}
            mb={0}
            imageSize={soloImageSize}
          />
        )}
        {newImage ? (
          <>
            <Item xs={12} sm={6}>
              <ImageHeader
                header="Previous Image"
                headerType="h4"
                src={image}
                imageSize={dualImageSize}
                mb={0}
              />
            </Item>
            <Item xs={12} sm={6}>
              <ImageHeader
                header="New Image"
                headerType="h4"
                src={newImage}
                imageSize={dualImageSize}
                mb={0}
              />
            </Item>
          </>
        ) : null}
      </Container>
      <ImageInput
        handleChange={handleChange}
        newImage={newImage}
        newImageName={newImageName}
        dense
      />
    </>
  );
};

export default ImageMixin;
