import { Section } from "@react-email/components";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

import React from "react";
interface EmailPropsType {
  username: string;
  link?: string;
}
const RegistrationTemplate = ({ username, link }: EmailPropsType) => {
  return (
    <Html>
      <Heading as="h1">Your Custom Reg Email</Heading>
      <Text>
        Dear {username}, Hope you're doing good. Thank You for Registering
      </Text>
    </Html>
  );
};

export default RegistrationTemplate;
