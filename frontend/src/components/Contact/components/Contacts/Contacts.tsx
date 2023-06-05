import React from "react";

import { BaseProps, Container, Flexer, Text } from "../../../../framework";
import { ContactInformationData, HoursData } from "../../Contact";
import { SocialType } from "../../../../settings";

interface ContactsProps extends BaseProps {
  contactData: ContactInformationData;
  hoursData: HoursData;
  socialData: SocialType;
  editMode: boolean;
  color?: "light" | "dark" | undefined;
  children: React.ReactNode;
}

const Contacts: React.FC<ContactsProps> = ({
  contactData,
  hoursData,
  socialData,
  editMode,
  color = "light",
  children,
  ...rest
}) => {
  return (
    <Flexer j="c" a="c" mb={20} mt={20} {...rest}>
      <div style={{ width: 900, borderRadius: 12 }}>
        <Text
          t="h2"
          mb={20}
          s="1.8rem"
          style={{ borderBottom: "1px solid black" }}
        >
          Contact Information
        </Text>
        <Container>{children}</Container>
      </div>
    </Flexer>
  );
};

export default Contacts;
