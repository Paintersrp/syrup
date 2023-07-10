import { Flexer, Item } from '@/components/Containers';
import {ImageMixin} from '@/features/editable/components/ImageMixin';

import React from 'react';

interface ImageTypeProps {
  formData: any;
  handleImageChange: any;
  newImage: any;
  newImageName: string;
}

const ImageType: React.FC<ImageTypeProps> = ({
  formData,
  handleImageChange,
  newImage,
  newImageName,
}) => {
  return (
    <Item
      xs={12}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <Flexer fd="column" w="50%">
        <ImageMixin
          formData={formData}
          handleChange={handleImageChange}
          newImage={newImage}
          newImageName={newImageName}
        />
      </Flexer>
    </Item>
  );
};

export default ImageType;
