import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import "./Login.css";

import { Button, Checkbox, Icon, Input, Text } from "../../Base";
import { Flexer, Page, Surface } from "../../Containers";

import AxiosInstance from "../../../utils/helpers/ApiAxiosInstance";
import { handleDataChange } from "../../../utils/handlers/dataHandlers";
import { setAuth, setUser } from "../../../lib/Actions/auth";

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const Login: FC = ({}) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let salt: string | number;
    let loginData: { username: string; password: string };

    AxiosInstance.post("/auth/salt/", { username: formData.username })
      .then(async (response) => {
        if (response.data.salt) {
          salt = response.data.salt;
          const hashedPassword = await new Promise<string>(
            (resolve, reject) => {
              bcrypt.hash(formData.password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
              });
            }
          );

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
        AxiosInstance.post("/auth/login/", loginData)
          .then((response) => {
            dispatch(
              setAuth({
                is_authenticated: response.data.authenticated,
              })
            );
            dispatch(
              setUser({
                is_superuser: response.data.is_superuser,
                username: response.data.username,
              })
            );

            if (formData.remember) {
              const expires = new Date(Date.parse(response.data.exp));
              Cookies.set("jwt", response.data.jwt, { expires });
              Cookies.set("username", formData.username, { expires: 90 });
            }
          })
          .then(() => {
            setTimeout(() => {
              navigate("/");
            }, 250);
          })
          .catch((err) => {
            console.log(err);
            setError("Invalid username or password.");
          });
      });
  };

  return (
    <Page>
      <Surface
        j="c"
        a="c"
        mt={0}
        mb={0}
        maxWidth={360}
        boxShadow={4}
        fillHeight
        px={3}
        py={3}
      >
        <Icon
          icon={faCoins}
          color="primary"
          size="2rem"
          style={{ margin: "8px 8px 16px 8px" }}
        />
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
            <Button
              type="submit"
              size="sm"
              style={{ fontSize: "0.95rem", width: 90 }}
            >
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
      </Surface>
    </Page>
  );
};

export default Login;
