import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { BaseProps } from '@/theme/base';

const styles = {
  button: (dense: boolean) =>
    css({
      cursor: 'pointer',
      backgroundColor: 'none',
      padding: dense ? 4 : 8,
      marginBottom: 12,
    }),
};

interface ImageInputProps extends BaseProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newImage: string | null;
  newImageName: string | null;
  type?: string;
  dense?: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  handleChange,
  newImage,
  newImageName,
  type = 'Image',
  dense = false,
  ...rest
}) => {
  const handleSelectFile = (e: any) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  };

  return (
    <Flexer j="c" {...rest}>
      <Button
        onClick={(e: any) => handleSelectFile(e)}
        css={styles.button(dense)}
        startIcon="upload"
      >
        <Text t="subtitle1" a="c" s={dense ? '0.85rem' : '0.95rem'}>
          {!newImage ? `Select New ${type}` : newImageName}
        </Text>
      </Button>
      <input
        accept="image/*"
        css={{ display: 'none' }}
        id="file-input"
        name="image"
        type="file"
        onChange={handleChange}
      />
    </Flexer>
  );
};
