import React from "react";
import parse from "html-react-parser";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Section } from "@react-email/components";
interface PromotionPropsType {
  username: string;
}
const PromotionTemplate = ({ username }: PromotionPropsType) => {
  return (
    <>
    <Html>
      <Heading as="h1">Your Custom Email</Heading>
      <Section>Dear {username}, Here is the Great offer for you</Section>
    </Html>
    </>
  );
};
export default PromotionTemplate;
