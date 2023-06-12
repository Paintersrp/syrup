import { useState, FC, FormEvent, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import './css/LoginForm.css';

import { handleDataChange } from '@/utils';
import { axios, handleAuth } from '@/lib';
import { Flexer } from '@/components/Containers';
import { Icon } from '@/components/Media';
import { Text } from '@/components/Elements';
import { Checkbox, Input } from '@/components/Form';
import { Button } from '@/components/Buttons';

interface LoginFormDTO {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: FC = ({}) => {
  const [formData, setFormData] = useState<LoginFormDTO>({
    username: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let salt: string | number;
    let loginData: { username: string; password: string };

    axios
      .post('/auth/salt/', { username: formData.username })
      .then(async (response) => {
        if (response.data.salt) {
          salt = response.data.salt;
          const hashedPassword = await new Promise<string>((resolve, reject) => {
            bcrypt.hash(formData.password, salt, (err, hash) => {
              if (err) reject(err);
              resolve(hash);
            });
          });

          loginData = {
            username: formData.username,
            password: hashedPassword,
          };
        } else {
          loginData = {
            username: formData.username,
            password: formData.password,
          };
        }
      })
      .then(async (response) => {
        axios
          .post('/auth/login/', loginData)
          .then((response) => {
            handleAuth(response, dispatch);

            if (formData.remember) {
              const expires = new Date(Date.parse(response.data.exp));
              Cookies.set('jwt', response.data.jwt, { expires });
              Cookies.set('username', formData.username, { expires: 90 });
            }
          })
          .then(() => {
            setTimeout(() => {
              navigate('/');
            }, 250);
          })
          .catch((err) => {
            console.log(err);
            setError('Invalid username or password.');
          });
      });
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
