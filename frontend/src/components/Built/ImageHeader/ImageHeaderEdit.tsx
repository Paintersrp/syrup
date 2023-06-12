import React, { useState } from 'react';

import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { BaseProps, HelpText, Text } from '@/components/Elements';

import { axios } from '@/lib';
import { Input, ImageInput } from '@/components/Form';
import { ImageHeader } from './ImageHeader';
import { ConfirmCancelBar } from '@/components/Built';
import { ImageHeaderType } from '../../../features/about/types';

interface ImageHeaderEditProps extends BaseProps {
  data: ImageHeaderType;
  onUpdate: (updatedData: ImageHeaderType) => void;
  handleCancel: () => void;
  setError: any;
}

export const ImageHeaderEdit: React.FC<ImageHeaderEditProps> = ({
  data,
  onUpdate,
  handleCancel,
  setError,
  ...rest
}) => {
  const [title, setTitle] = useState<string>(data.title);
  const [image, setImage] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [newImageName, setNewImageName] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
      setNewImage(URL.createObjectURL(selectedImage));
      setNewImageName(selectedImage.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);

    if (image) {
      formData.append('image', image, image.name);
    }

    try {
      const res = await axios.patch(`/aboutheader/1/`, formData);
      onUpdate(res.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Surface boxShadow={0} className="fade-in" px={3} py={3} br={12} pb={6} {...rest}>
      <Text t="h3" a="c">
        About Header Edit
      </Text>
      <Flexer fd="column" a="c" j="c" mt={24} style={{ padding: 8 }}>
        <HelpText>Title</HelpText>
        <Input name="title" value={title} onChange={(event) => setTitle(event.target.value)} />

        {data.image && (
          <React.Fragment>
            <Container>
              {!newImage && data.image && (
                <ImageHeader header="Current Image" headerType="h4" src={data.image} mb={0} />
              )}
              {newImage ? (
                <React.Fragment>
                  <Item xs={12} sm={6}>
                    <ImageHeader header="Previous Image" headerType="h4" src={data.image} mb={0} />
                  </Item>
                  <Item xs={12} sm={6}>
                    <ImageHeader header="New Image" headerType="h4" src={newImage} mb={0} />
                  </Item>
                </React.Fragment>
              ) : null}
            </Container>
            <ImageInput
              handleChange={handleImageChange}
              newImage={newImage}
              newImageName={newImageName}
            />
          </React.Fragment>
        )}
      </Flexer>
      <ConfirmCancelBar
        handleConfirm={handleSubmit}
        handleCancel={handleCancel}
        position="bottom"
        mt={8}
      />
    </Surface>
  );
};
