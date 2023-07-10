import { FC } from 'react';

import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';

export const Register: FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
