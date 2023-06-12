import React, { useState, FC, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import './css/RegisterForm.css';

import { axios, handleAuth } from '@/lib';
import { handleDataChange } from '@/utils';
import { Container, Flexer, Item } from '@/components/Containers';
import { Icon } from '@/components/Media';
import { Text } from '@/components/Elements';
import { Input } from '@/components/Form';
import { ActionButton, Button } from '@/components/Buttons';
import { Collapser } from '@/components/Animation';

import { advancedRegisterFields, registerFields, registerInitialData } from '../api/registerConst';

const RegisterForm: FC = ({}) => {
  const [formData, setFormData] = useState<any>(registerInitialData);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent) => {
    event?.preventDefault();
    setIsAdvanced(!isAdvanced);
  };

  const submitLogic = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(formData.password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const loginData = {
      username: formData.username,
      password: hashedPassword,
    };

    axios
      .post('/auth/register/', {
        ...formData,
        password: hashedPassword,
        salt: salt,
      })
      .then((res) => {
        axios.post('/auth/login/', loginData).then((response) => {
          handleAuth(response, dispatch);

          const expires = new Date(Date.parse(response.data.exp));
          Cookies.set('jwt', response.data.jwt, { expires });
          Cookies.set('username', formData.username, { expires: 90 });
        });
      })
      .then(() => navigate('/'))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Fragment>
      <Icon icon={faCoins} color="primary" size="2rem" style={{ margin: '8px 8px 16px 8px' }} />
      <Text t="h2" a="c" className="register-heading">
        Register
      </Text>
      <Container style={{ marginTop: 8 }}>
        {registerFields.map((field) => (
          <Item
            xs={field.id === 'firstName' || field.id === 'lastName' ? 6 : 12}
            style={{
              paddingRight: field.id === 'firstName' ? 3 : 0,
              paddingLeft: field.id === 'lastName' ? 3 : 0,
            }}
          >
            <Input
              id={field.id}
              name={field.id}
              type={field.type || 'text'}
              helpText={field.label}
              value={formData[field.id]}
              onChange={(e) => handleDataChange(e, setFormData, formData)}
              style={{
                marginTop: 8,
              }}
              inputStyle={{ marginTop: 2 }}
            />
          </Item>
        ))}
      </Container>
      <Flexer fd="column" j="c" mt={16}>
        <Button
          type="submit"
          size="sm"
          style={{ fontSize: '0.95rem', width: 80 }}
          onClick={submitLogic}
        >
          Submit
        </Button>
        <Flexer j="fs" mt={8}>
          <Link to="/login" className="link-text">
            <Text>Already have an account? Login</Text>
          </Link>
        </Flexer>
      </Flexer>
      <Flexer j="je" mt={4}>
        <Text w="90%" a="r" mr={8}>
          Advanced Registration
        </Text>
        <ActionButton
          type={isAdvanced ? 'close' : 'open'}
          size="t"
          fontSize="0.9rem"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpen(e)}
          iconStyle={{ marginTop: 1 }}
        />
      </Flexer>
      <Collapser isOpen={isAdvanced}>
        <Container>
          {advancedRegisterFields.map((field: any) => (
            <Item
              xs={field.grid ? field.grid : 6}
              key={field.id}
              style={{
                paddingRight: field.id === 'city' || field.id === 'zipcode' ? 3 : 0,
                paddingLeft: field.id === 'state' || field.id === 'country' ? 3 : 0,
              }}
            >
              <Input
                id={field.id}
                name={field.id}
                type={field.type || 'text'}
                helpText={field.label}
                value={formData[field.id]}
                onChange={(e) => handleDataChange(e, setFormData, formData)}
                style={{
                  marginTop: 8,
                }}
                inputStyle={{ marginTop: 2 }}
              />
            </Item>
          ))}
        </Container>
      </Collapser>
    </Fragment>
  );
};

export default RegisterForm;
