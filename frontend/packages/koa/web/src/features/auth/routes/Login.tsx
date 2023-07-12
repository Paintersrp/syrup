import { FC } from 'react';

import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export const Login: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
