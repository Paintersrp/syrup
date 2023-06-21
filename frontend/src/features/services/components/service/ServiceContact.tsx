import { FC, useState } from 'react';
import { useTheme } from '@emotion/react';

import { ContactButtons, SocialButtons } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Input } from '@/components/Form';
import { Icon } from '@/components/Media';
import { ButtonBar } from '@/features/editable';
import { useFormValidation } from '@/hooks';
import { axios, validateForm } from '@/lib/api';
import { useEditModeStore } from '@/stores/editmode';
import { useAlertStore } from '@/stores/alert';

import { useServiceData } from './ServiceProvider';

const contactFields = [
  {
    id: 'name',
    label: 'Full Name',
    autoComplete: 'name',
  },
  {
    id: 'email',
    label: 'Email Address',
    autoComplete: 'email',
  },
  {
    id: 'phone',
    label: 'Phone',
    autoComplete: 'phone',
  },
  {
    id: 'message',
    label: 'Message',
    autoComplete: 'message',
    multiline: true,
  },
];

type ServiceContactProps = {};

export const ServiceContact: FC<ServiceContactProps> = ({}) => {
  const th: any = useTheme();
  const { data, fullData } = useServiceData();

  const { showAlert } = useAlertStore();
  const { editMode } = useEditModeStore();

  const [apiError, setApiError] = useState(null);

  const submitLogic = (event: any) => {
    event.preventDefault();
    values.subject = `${data.service_title} Inquiry`;

    axios
      .post('/messages/', values)
      .then(() => {
        resetForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          subject: '',
        });
        showAlert('success', 'Message Sent');
      })
      .catch((err) => {
        setApiError(err);
        showAlert('error', 'Error occured, try again later');
      });
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useFormValidation(
    {},
    validateForm,
    submitLogic
  );

  return (
    <Item xs={12} sm={12} md={12} lg={4} align="center" justify="center">
      <form id="apply-now-form" onSubmit={handleSubmit}>
        <Surface maxWidth={350} boxShadow={1} br={12} j="c">
          <Flexer j="c" mb={4}>
            <Icon icon="contact_mail" size="36px" color={th.primary} />
          </Flexer>
          <Text t="h3" s="1.75rem" a="c" mb={2}>
            Contact Us
          </Text>

          <Container spacing={1}>
            <Item xs={12}>
              <Text a="c" t="body2" mb={16}>
                Contact us today to learn more about our {data.service_title} Service and how it can
                help take your business to the next level. We look forward to hearing from you!
              </Text>
            </Item>
            {contactFields.map((field: { id: string; label: string; multiline?: boolean }) => (
              <Item xs={12} sm={12} key={field.id}>
                <Input
                  size="medium"
                  id={field.id}
                  name={field.id}
                  type="text"
                  helpText={field.label}
                  value={values[field.id]}
                  onChange={handleChange}
                  style={{
                    marginTop: 4,
                  }}
                  inputStyle={{ marginTop: 2 }}
                  multiline={field.multiline}
                  rows={6}
                />
              </Item>
            ))}
            {editMode && <ButtonBar adminLink="messages" text="Messages" />}
            <Item xs={12} mt={18}>
              <Button size="sm" type="submit" endIcon="send" w={70}>
                Send
              </Button>
            </Item>
            <Item xs={12} mt={18}>
              <Text a="c" t="body1" s="1.05rem" style={{ maxWidth: 700 }}>
                Prefer to contact us via social media, email, or phone?
              </Text>
            </Item>
          </Container>
          {fullData && (
            <Item fd="column" j="c" a="c" mt={12} xs={12}>
              <ContactButtons
                contactData={fullData.contactInfo}
                size="sm"
                mb={6}
                borderRadius={4}
              />
              <SocialButtons
                invertColors={false}
                socialsData={fullData.socials}
                showTitle={false}
                editMode={editMode}
                buttonClass="primary-button"
                buttonSize="md"
              />
            </Item>
          )}
        </Surface>
      </form>
    </Item>
  );
};
