import { useState, FC, FormEvent, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import './css/LoginForm.css';

import { Button } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Checkbox, Input } from '@/components/Form';
import { Icon } from '@/components/Media';
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { ErrorResponse } from '@/types';
import { handleDataChange } from '@/utils';

import { useLogin, useSalt } from '../api/useLogin';
import { LoginFormDTO } from '../types';

// Form Validation

const LoginForm: FC = ({}) => {
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
      <Icon icon={faCoins} color="primary" size="2rem" style={{ margin: '8px 8px 16px 8px' }} />
      <Text t="h2" a="c" className="login-heading">
        Sign in
      </Text>
      <form className="login-form" onSubmit={handleSubmit}>
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
        />
        <Flexer fd="column" j="c" mt={8}>
          <Button type="submit" size="sm" style={{ fontSize: '0.95rem', width: 90 }}>
            Login Now
          </Button>
          <Flexer j="sb" mt={16}>
            <Link to="#" className="link-text">
              <Text>Forgot password?</Text>
            </Link>
            <Link to="/register" className="link-text">
              <Text>Don't have an account?</Text>
            </Link>
          </Flexer>
        </Flexer>
      </form>
    </Fragment>
  );
};

export default LoginForm;
