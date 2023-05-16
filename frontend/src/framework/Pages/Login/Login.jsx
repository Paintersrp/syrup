import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import "./Login.css";

import BaseIcon from "../../Base/BaseIcon/BaseIcon";
import BaseInput from "../../Base/BaseInput/BaseInput";
import Page from "../../Base/Containers/Page/Page";
import Surface from "../../Base/Containers/Surface/Surface";
import Text from "../../Base/Text/Text";
import BaseButton from "../../Base/BaseButton/BaseButton";
import Flexer from "../../Base/Flexer/Flexer";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";
import { setAuth, setUser } from "../../../lib/Actions/auth";

const Login = ({}) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let salt;
    let loginData;

    axiosInstance
      .post("/auth/salt/", { username: formData.username })
      .then(async (response) => {
        if (response.data.salt) {
          salt = response.data.salt;
          const hashedPassword = await new Promise((resolve, reject) => {
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
        axiosInstance
          .post("/auth/login/", loginData)
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

            // if (formData.rememberMe) {
            const expires = new Date(Date.parse(response.data.exp));
            Cookies.set("jwt", response.data.jwt, { expires });
            Cookies.set("username", formData.username, { expires: 90 });
            // }
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
        pad={3}
      >
        <BaseIcon
          icon={faCoins}
          color="primary"
          fontSize="2rem"
          style={{ margin: "8px 8px 16px 8px" }}
        />
        <Text t="h2" className="login-heading">
          Sign in
        </Text>
        <form className="login-form" onSubmit={handleSubmit}>
          <BaseInput
            id="username"
            name="username"
            type="text"
            helpText="Username"
            value={formData.name}
            onChange={(e) => handleDataChange(e, setFormData, formData)}
            style={{ marginTop: 16 }}
            inputStyle={{ marginTop: 2 }}
          />
          <BaseInput
            id="password"
            name="password"
            type="password"
            helpText="Password"
            value={formData.name}
            onChange={(e) => handleDataChange(e, setFormData, formData)}
            style={{ marginTop: 8 }}
            inputStyle={{ marginTop: 2 }}
          />
          {/* Need a Checkbox for "Remember Me" */}
          {/*          
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                style={{ color: "black" }}
              />
            }
            label="Remember me"
          />
          */}
          <Flexer fd="column" j="c" mt={16}>
            <BaseButton
              type="submit"
              size="sm"
              style={{ fontSize: "0.95rem", width: 80 }}
            >
              Submit
            </BaseButton>
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
