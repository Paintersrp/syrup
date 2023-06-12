import { FC, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { ButtonBar, ErrorDisplay, SocialButtons } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Flexer, Item, Surface } from '@/components/Containers';
import { BaseProps, Text } from '@/components/Elements';
import { Input, Option, Select, useFormValidation, validateForm } from '@/components/Form';
import { SocialType } from '@/settings';

import {
  contactFields,
  initialContactData,
  subjectOptions,
  useContactForm,
} from '../api/useContactForm';

interface ContactFormProps extends BaseProps {
  socialData: SocialType[];
  editMode: boolean;
  color?: 'light' | 'dark' | undefined;
}

export const ContactForm: FC<ContactFormProps> = ({
  socialData,
  editMode,
  color = 'light',
  ...rest
}) => {
  const dispatch = useDispatch();

  const submitLogic = (event: FormEvent) => {
    event.preventDefault();
    useContactForm(resetForm, values, dispatch);
  };

  const { values, errors, setErrors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useFormValidation(initialContactData, validateForm, submitLogic);

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
        {editMode && <ButtonBar justifyContent="flex-end" adminLink="messages" text="Messages" />}
        <Text t="h3" a="c" fw="bold" mb={12}>
          Have an Inquiry?
        </Text>
        <Text t="body1" s="0.85rem" a="c" mb={6}>
          Fill out the form below and one of our experts will get in touch with you
        </Text>
        <Select
          dense
          name="subject"
          label="Subject"
          value={values.subject}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          <Option dense value="None">
            None
          </Option>
          {subjectOptions.map((option) => (
            <Option dense key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        {contactFields.map((field) => (
          <Input
            size="small"
            id={field.id}
            name={field.id}
            helpText={field.label}
            value={values[field.id]}
            onChange={handleChange}
            multiline={field.multiline}
            style={{
              marginTop: 6,
            }}
          />
        ))}
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
