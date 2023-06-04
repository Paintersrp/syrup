import React from "react";

import {
  BaseProps,
  Container,
  Flexer,
  Item,
  Text,
} from "../../../../framework";
import { ContactInformationData, HoursData } from "../../Contact";
import { ContactForm, Hours, Information } from "./components";
import { SocialType } from "../../../../settings";

interface ContactsProps extends BaseProps {
  contactData: ContactInformationData;
  hoursData: HoursData;
  socialData: SocialType;
  editMode: boolean;
  color?: "light" | "dark" | undefined;
}

export default function Contacts({
  contactData,
  hoursData,
  socialData,
  editMode,
  color = "light",
  ...rest
}: ContactsProps) {
  return (
    <Flexer j="c" a="c" mb={60} mt={20} {...rest}>
      <div style={{ width: 900, borderRadius: 12 }}>
        <Text
          t="h2"
          mb={20}
          s="1.8rem"
          style={{ borderBottom: "1px solid black" }}
        >
          Contact Information
        </Text>
        <Container>
          <Item xs={6} style={{ flexDirection: "column" }}>
            <Information editMode={editMode} contactData={contactData} />
            <Hours hoursData={hoursData} editMode={editMode} />
          </Item>
          <ContactForm
            socialData={socialData}
            editMode={editMode}
            color={color}
          />
        </Container>
      </div>
    </Flexer>
  );
}
