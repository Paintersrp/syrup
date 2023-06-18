import React, { CSSProperties } from 'react';

import { Button, ButtonSize } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';

interface ContactButtonsProps {
  contactData: {
    phone?: string;
    email?: string;
  };
  size?: ButtonSize;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  borderRadius?: CSSProperties['borderRadius'];
}

const ContactButtons: React.FC<ContactButtonsProps> = ({
  contactData,
  size = 'md',
  mt: marginTop = 8,
  mb: marginBottom = 0,
  borderRadius,
}) => {
  return (
    <Flexer j="c" mt={marginTop} mb={marginBottom}>
      <Button
        size={size}
        startIcon="phone"
        href={`tel:${contactData?.phone || ''}`}
        w={size === 'md' ? 105 : size === 'sm' ? 85 : size === 'tiny' ? 75 : 110}
        mr={4}
        style={{ borderRadius: borderRadius }}
      >
        Call Us
      </Button>
      <Button
        size={size}
        startIcon="email"
        href={`mailto:${contactData?.email || ''}`}
        w={size === 'md' ? 105 : size === 'sm' ? 85 : size === 'tiny' ? 75 : 110}
        ml={4}
        style={{ borderRadius: borderRadius }}
      >
        Email Us
      </Button>
    </Flexer>
  );
};

export default ContactButtons;
