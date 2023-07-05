/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import { BaseProps } from '../../../theme/base';
import { GenericMapping } from '../../../types';
import { Button, ButtonSize } from '../../Buttons';
import { Flexer } from '../../Containers';

const sizeMapping: GenericMapping = {
  tiny: 75,
  sm: 85,
  md: 105,
  lg: 110,
};

interface ContactButtonsProps extends BaseProps {
  contactData: {
    phone?: string;
    email?: string;
  };
  size?: ButtonSize;
  mt?: CSSProperties['marginTop'];
  borderRadius?: CSSProperties['borderRadius'];
}

export const ContactButtons: FC<ContactButtonsProps> = ({
  contactData,
  size = 'md',
  mt: marginTop = 8,
  borderRadius,
  ...rest
}) => {
  const buttonWidth = sizeMapping[size];

  return (
    <Flexer j="c" mt={marginTop} {...rest} gap={6}>
      <Button
        size={size}
        startIcon="phone"
        href={`tel:${contactData?.phone || ''}`}
        w={buttonWidth}
        css={{ borderRadius }}
      >
        Call Us
      </Button>
      <Button
        size={size}
        startIcon="email"
        href={`mailto:${contactData?.email || ''}`}
        w={buttonWidth}
        css={{ borderRadius }}
      >
        Email Us
      </Button>
    </Flexer>
  );
};
