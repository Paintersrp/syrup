/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import { BaseProps } from '../../../theme/base';
import { Flexer } from '../../Containers';
import { Media, Text, TextType } from '../../Elements';

// use Editable

interface ImageHeaderProps extends BaseProps {
  header?: string;
  headerType?: TextType;
  src?: string;
  mb?: CSSProperties['marginBottom'];
  fade?: boolean;
  boxShadow?: boolean;
}

export const ImageHeader: FC<ImageHeaderProps> = ({
  header = `About`,
  headerType = 'h2',
  src = 'https://source.unsplash.com/1400x900/?service',
  mb: marginBottom = 32,
  fade = false,
  boxShadow = false,
  ...rest
}) => {
  return (
    <Flexer
      j="c"
      a="c"
      fd="column"
      className={`${fade ? 'fade-in' : ''}`}
      mb={marginBottom}
      {...rest}
    >
      {header && (
        <Text t={headerType} a="c" mt={24} mb={24}>
          {header}
        </Text>
      )}
      <div style={{ width: '85%' }}>
        {src && <Media src={src} altText={header} boxShadow={boxShadow ? 1 : 0} mb={24} />}
      </div>
    </Flexer>
  );
};
