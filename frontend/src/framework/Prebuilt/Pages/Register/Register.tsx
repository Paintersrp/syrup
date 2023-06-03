import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import "./Register.css";

import {
  advancedRegisterFields,
  registerFields,
  registerInitialData,
} from "./const";
import {
  Collapser,
  Container,
  Flexer,
  Item,
  Page,
  Surface,
} from "../../../Containers";
import { ApiAxiosInstance, handleDataChange } from "../../../../utils";
import { ActionButton, Button, Icon, Input, Text } from "../../../Base";
import { setAuth, setUser } from "../../../../lib";

const Register: FC = ({}) => {
  const [formData, setFormData] = useState(registerInitialData);
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

    ApiAxiosInstance.post("/auth/register/", {
      ...formData,
      password: hashedPassword,
      salt: salt,
    })
      .then((res) => {
        ApiAxiosInstance.post("/auth/login/", loginData).then((response) => {
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
          const expires = new Date(Date.parse(response.data.exp));
          Cookies.set("jwt", response.data.jwt, { expires });
          Cookies.set("username", formData.username, { expires: 90 });
        });
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Page>
      <Surface
        j="c"
        a="c"
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
        <Text t="h2" a="c" className="register-heading">
          Register
        </Text>
        <Container style={{ marginTop: 8 }}>
          {registerFields.map((field) => (
            <Item
              xs={field.id === "firstName" || field.id === "lastName" ? 6 : 12}
              style={{
                paddingRight: field.id === "firstName" ? 3 : 0,
                paddingLeft: field.id === "lastName" ? 3 : 0,
              }}
            >
              <Input
                id={field.id}
                name={field.id}
                type={field.type || "text"}
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
            style={{ fontSize: "0.95rem", width: 80 }}
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
            type={isAdvanced ? "close" : "open"}
            size="t"
            fontSize="0.9rem"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpen(e)}
            iconStyle={{ marginTop: 1 }}
          />
        </Flexer>
        <Collapser isOpen={isAdvanced}>
          <Container>
            {advancedRegisterFields.map((field) => (
              <Item
                xs={field.grid ? field.grid : 6}
                key={field.id}
                style={{
                  paddingRight:
                    field.id === "city" || field.id === "zipcode" ? 3 : 0,
                  paddingLeft:
                    field.id === "state" || field.id === "country" ? 3 : 0,
                }}
              >
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
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
      </Surface>
    </Page>
  );
};

export default Register;
