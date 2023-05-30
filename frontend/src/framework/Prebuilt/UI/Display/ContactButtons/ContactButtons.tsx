import React from "react";

import { palettes } from "../../../../../theme";
import { Button } from "../../../../Base";
import { Flexer } from "../../../../Containers";

interface ContactButtonsProps {
  contactData: {
    phone?: string;
    email?: string;
  };
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ contactData }) => {
  return (
    <Flexer j="c" mt={8}>
      <Button
        size="md"
        startIcon="phone"
        href={`tel:${contactData?.phone || ""}`}
        w={100}
        mr={4}
        manualHover={palettes.primary.light}
      >
        Call Us
      </Button>
      <Button
        size="md"
        startIcon="voicemail"
        href={`mailto:${contactData?.email || ""}`}
        w={100}
        ml={4}
        manualHover={palettes.primary.light}
      >
        Email Us
      </Button>
    </Flexer>
  );
};

export default ContactButtons;
