import { FC, ReactNode } from 'react';

import { Container, Flexer } from '@/components/Containers';
import { BaseProps, Text } from '@/components/Elements';

interface ContactsProps extends BaseProps {
  children: ReactNode;
}

export const Contacts: FC<ContactsProps> = ({ children, ...rest }) => {
  return (
    <Flexer j="c" a="c" mb={20} mt={20} {...rest}>
      <div style={{ width: 900, borderRadius: 12 }}>
        <Text t="h2" mb={20} s="1.8rem" style={{ borderBottom: '1px solid black' }}>
          Contact Information
        </Text>
        <Container>{children}</Container>
      </div>
    </Flexer>
  );
};
