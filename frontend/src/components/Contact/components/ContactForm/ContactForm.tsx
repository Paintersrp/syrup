import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  BaseProps,
  Button,
  ButtonBar,
  ErrorDisplay,
  Flexer,
  Input,
  Item,
  Option,
  Select,
  SocialButtons,
  Surface,
  Text,
  useFormValidation,
  validateForm,
} from "../../../../framework";
import { ApiAxiosInstance } from "../../../../utils";
import { SocialType } from "../../../../settings";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

interface ContactFormProps extends BaseProps {
  socialData: SocialType;
  editMode: boolean;
  color?: "light" | "dark" | undefined;
}

const options = [
  { label: "General Inquiry", value: "General Inquiry" },
  { label: "Support", value: "Support" },
  { label: "Partnership", value: "Partnership" },
  { label: "Other", value: "Other" },
];

const initialContactData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  subject: "None",
};

const ContactForm: React.FC<ContactFormProps> = ({
  socialData,
  editMode,
  color = "light",
  ...rest
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ContactFormData>(initialContactData);

  const submitLogic = (event: React.FormEvent) => {
    event.preventDefault();

    ApiAxiosInstance.post("/messages/", values)
      .then(() => {
        resetForm(initialContactData);
        dispatch({ type: "ALERT_SUCCESS", message: "Message Sent" });
      })
      .then(() => {
        console.log("VALUES: ", values);
      })
      .catch((err) => {
        dispatch({
          type: "ALERT_FAIL",
          message: "Error occurred, try again later",
        });
        console.log(err);
      });
  };

  const {
    values,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormValidation(formData, validateForm, submitLogic);

  return (
    <Item xs={6} fd="column" {...rest}>
      <Surface
        boxShadow={1}
        maxWidth={325}
        br={1.5}
        a="c"
        j="c"
        mt={2}
        mb={1}
        py={1.5}
        className="fade-in"
      >
        {editMode && (
          <ButtonBar
            justifyContent="flex-end"
            adminLink="messages"
            text="Messages"
          />
        )}
        <Text t="h3" a="c" fw="bold" mb={12}>
          Have an Inquiry?
        </Text>
        <Text t="body1" s="0.85rem" a="c" mb={6}>
          Fill out the form below and one of our experts will get in touch with
          you
        </Text>
        <Select
          dense
          name="subject"
          label="Subject"
          value={values.subject}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          <Option dense value="None">
            None
          </Option>
          {options.map((option) => (
            <Option dense key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Input
          size="medium"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          helpText="Full Name"
          style={{ marginTop: 6 }}
        />
        <Input
          size="medium"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          helpText="Email Address"
          style={{ marginTop: 6 }}
        />
        <Input
          size="medium"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          helpText="Phone Number"
          style={{ marginTop: 6 }}
        />
        <Input
          size="medium"
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          helpText="Message"
          style={{ marginTop: 6 }}
          multiline
        />
        <Flexer j="c" mt={12}>
          <Button
            startIcon="email"
            onClick={handleSubmit}
            style={{ borderRadius: 16 }}
            textSize="0.8rem"
            iconSize="16px"
          >
            Get In Touch
          </Button>
        </Flexer>
        <ErrorDisplay errors={errors} setErrors={setErrors} mt={8} />
      </Surface>
      <SocialButtons
        invertColors={false}
        color={color}
        socialsData={socialData}
        showTitle={false}
        editMode={editMode}
        buttonClass="primary-button"
        buttonSize="md"
      />
    </Item>
  );
};

export default ContactForm;
