import { FC, ReactNode } from 'react';
import { Page, Surface } from 'sy-core';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Page>
      <Surface j="c" a="c" mt={0} mb={0} maxWidth={360} boxShadow={4} fillHeight px={3} py={3}>
        {children}
      </Surface>
    </Page>
  );
};

export default AuthLayout;
