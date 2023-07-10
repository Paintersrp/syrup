import { useState, FC, FormEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';


import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { ExtendedTheme } from '@/theme/types';

import { ErrorResponse } from '@/types';
import { handleDataChange } from '@/utils';

import { useLogin, useSalt } from '../api/useLogin';
import { LoginFormDTO } from '../types';
import { inject } from '@/theme/utils/inject';
import { Button, Checkbox, Flexer, Icon, Input, Link, Text } from 'sy-core';

const styles = (theme: ExtendedTheme) => ({
  header: css({
    borderBottom: `1px solid ${theme.dark}`,
    paddingBottom: 5,
  }),
});

// Form Validation

const LoginForm: FC = ({}) => {
  const css = inject(styles);

  const [formData, setFormData] = useState<LoginFormDTO>({
    username: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState<ErrorResponse | unknown>();
  const navigate = useNavigate();

  const alertStore = useAlertStore();
  const authStore = useAuthStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = await useSalt(setError, formData);

    if (loginData) {
      useLogin(formData, loginData, navigate, setError, alertStore, authStore);
    }
  };

  return (
    <Fragment>
      <Icon icon="send_money" color="primary" size="2rem" style={{ margin: '8px 8px 16px 8px' }} />
      <Text t="h2" a="c" css={css.header}>
        Sign in
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          name="username"
          type="text"
          helpText="Username"
          value={formData.username}
          onChange={(e) => handleDataChange(e, setFormData, formData)}
          style={{ marginTop: 16 }}
          inputStyle={{ marginTop: 2 }}
        />
        <Input
          id="password"
          name="password"
          type="password"
          helpText="Password"
          value={formData.password}
          onChange={(e) => handleDataChange(e, setFormData, formData)}
          style={{ marginTop: 8 }}
          inputStyle={{ marginTop: 2 }}
        />

        <Checkbox
          checked={formData.remember}
          onChange={(e) => handleDataChange(e, setFormData, formData)}
          name="remember"
          label="Remember Me?"
          mt={8}
          invert={true}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        />

        <Flexer fd="column" j="c" a="c" mt={8}>
          <Button type="submit" size="sm" style={{ fontSize: '0.95rem', width: 90 }}>
            Login Now
          </Button>
          <Flexer j="sb" mt={16}>
            <Link to="#">
              <Text>Forgot password?</Text>
            </Link>
            <Link to="/register">
              <Text>Don't have an account?</Text>
            </Link>
          </Flexer>
        </Flexer>
      </form>
    </Fragment>
  );
};

export default LoginForm;
