import React from "react";
import { CSSProperties } from "react";

import { palettes } from "../../../../../utils/Theming/theme";
import { Button, ButtonSize } from "../../../../Components";
import { Flexer } from "../../../../Containers";

interface ContactButtonsProps {
  contactData: {
    phone?: string;
    email?: string;
  };
  size?: ButtonSize;
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  borderRadius?: CSSProperties["borderRadius"];
}

const ContactButtons: React.FC<ContactButtonsProps> = ({
  contactData,
  size = "md",
  mt: marginTop = 8,
  mb: marginBottom = 0,
  borderRadius,
}) => {
  return (
    <Flexer j="c" mt={marginTop} mb={marginBottom}>
      <Button
        textSize={size === "md" ? "0.9rem" : "0.8rem"}
        iconSize={size === "md" ? "18px" : "16px"}
        size={size}
        startIcon="phone"
        href={`tel:${contactData?.phone || ""}`}
        w={size === "md" ? 100 : size === "sm" ? 85 : 100}
        mr={4}
        manualHover={palettes.primary.light}
        style={{ borderRadius: borderRadius }}
      >
        Call Us
      </Button>
      <Button
        textSize={size === "md" ? "0.9rem" : "0.8rem"}
        iconSize={size === "md" ? "18px" : "16px"}
        size={size}
        startIcon="email"
        href={`mailto:${contactData?.email || ""}`}
        w={size === "md" ? 100 : size === "sm" ? 85 : 100}
        ml={4}
        manualHover={palettes.primary.light}
        style={{ borderRadius: borderRadius }}
      >
        Email Us
      </Button>
    </Flexer>
  );
};

export default ContactButtons;
