import { FC } from 'react';

import { breakPoints, useBreakpoint } from '@/utils';
import { Input } from '@/components/Form';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { ErrorDisplay } from '@/components/Built';

type QuestionnaireFormProps = {
  values: any;
  handleChange: any;
  errors: any;
  setErrors: any;
};

export const QuestionnaireForm: FC<QuestionnaireFormProps> = ({
  values,
  handleChange,
  errors,
  setErrors,
}) => {
  const isSmallScreen = useBreakpoint(breakPoints.sm);

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
