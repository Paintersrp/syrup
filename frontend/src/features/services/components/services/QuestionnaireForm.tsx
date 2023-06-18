import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';

import { ErrorDisplay } from '@/components/Built';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Input } from '@/components/Form';
import { Divider, Text } from '@/components/Elements';
import { useBreakpoint } from '@/hooks';

type QuestionnaireFormProps = {
  values: {
    name: string;
    email: string;
    phone: string;
    state: string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: string[];
  setErrors: Dispatch<SetStateAction<string[]>>;
};

export const QuestionnaireForm: FC<QuestionnaireFormProps> = ({
  values,
  handleChange,
  errors,
  setErrors,
}) => {
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Flexer fd="column" mt={8}>
      <Surface minHeight={300} maxWidth={isSmallScreen ? 500 : 800} py={0}>
        <Text t="h3" fw="bold" a="c">
          Contact Information
        </Text>
        <Divider />
        <Container justify="center" align="center">
          <Item xs={6} pr={4}>
            <Input
              size="medium"
              helpText="Full Name"
              id="fullName"
              name="fullName"
              value={values.name}
              onChange={handleChange}
            />
          </Item>
          <Item xs={6} pl={4}>
            <Input
              size="medium"
              helpText="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Item>
          <Item xs={6} style={{ paddingRight: 4 }}>
            <Input
              size="medium"
              helpText="Phone"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
          </Item>
          <Item xs={6} style={{ paddingLeft: 4 }}>
            <Input
              size="medium"
              helpText="State of Residence"
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
            />
          </Item>
        </Container>
        <ErrorDisplay setErrors={setErrors} errors={errors} mt={16} />
      </Surface>
    </Flexer>
  );
};
