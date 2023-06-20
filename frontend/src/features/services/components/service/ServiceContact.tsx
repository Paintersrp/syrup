import { FC, useState } from 'react';

import { ButtonBar, SocialButtons } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Container, Item, Surface } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Input } from '@/components/Form';
import { Icon } from '@/components/Media';
import { ContactInformationContent, Information } from '@/features/contact';
import { useFormValidation } from '@/hooks';
import { axios, validateForm } from '@/lib/api';
import { SocialContent } from '@/types';
import { useEditModeStore } from '@/stores/editmode';
import { useAlertStore } from '@/stores/alert';

import { ServiceType } from '../../types';

const contactFields = [
  {
    id: 'name',
    label: 'Full Name',
    autoComplete: 'name',
    grid: 6,
  },
  {
    id: 'email',
    label: 'Email Address',
    autoComplete: 'email',
    grid: 6,
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

type ServiceContactProps = {
  data: ServiceType;
  formRef: any;
  contactData: ContactInformationContent;
  socialData: SocialContent[];
};

export const ServiceContact: FC<ServiceContactProps> = ({
  data,
  formRef,
  contactData,
  socialData,
}) => {
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
    <form id="apply-now-form" ref={formRef} onSubmit={handleSubmit}>
      <Surface maxWidth={1000} boxShadow={1} br={12} mb={64} j="c" px={6}>
        <Icon icon="contact_mail" size="36px" />
        <Text t="h2" a="c">
          Contact Us
        </Text>

        <Container spacing={1}>
          <Item xs={12}>
            <Text a="c" w={700} mb={16}>
              Contact us today to learn more about our {data.service_title} and how it can help take
              your business to the next level. We look forward to hearing from you!
            </Text>
          </Item>
          {contactFields.map(
            (field: { id: string; label: string; grid?: number; multiline?: boolean }) => (
              <Item
                xs={12}
                sm={field.grid ? field.grid : 12}
                key={field.id}
                style={{
                  paddingRight: field.id === 'name' ? 4 : 0,
                  paddingLeft: field.id === 'email' ? 4 : 0,
                }}
              >
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
                />
              </Item>
            )
          )}
          {editMode && <ButtonBar adminLink="messages" text="Messages" />}
          <Item xs={12} mt={18}>
            <Button size="sm" type="submit" endIcon="send" w={70}>
              Send
            </Button>
          </Item>
          <Item xs={12} mt={18}>
            <Text a="c" t="h3" style={{ maxWidth: 700 }}>
              Prefer to contact us via social media, email, or phone?
            </Text>
          </Item>
        </Container>
        {contactData && (
          <Item fd="column" j="c" a="c" mt={12} xs={12}>
            <Information contactData={contactData} />
            <SocialButtons
              invertColors={false}
              socialsData={socialData}
              showTitle={false}
              editMode={editMode}
              buttonClass="primary-button"
              buttonSize="md"
            />
          </Item>
        )}
      </Surface>
    </form>
  );
};
