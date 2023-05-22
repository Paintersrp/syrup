import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./AppFooter.css";

import {
  Button,
  Divider,
  Icon,
  IconButton,
  Input,
  Text,
  Tooltip,
} from "../../../Base";
import { Flexer } from "../../../Containers";

import { handleDataChange } from "../../../../utils/dataHandlers/dataHandlers";
import { LOGO, SOCIALS, LINKS, TITLE } from "../../../../settings";
import { palettes } from "../../../../theme";

interface Data {
  email: string;
}

const AppFooter: FC = ({}) => {
  const [state, setState] = useState("initial");
  const [data, setData] = useState<Data>({ email: "" });

  return (
    <div className="footer-root">
      <div className="footer-container">
        <Flexer mb={0} j="c">
          <Tooltip text="View Home Page" position="right">
            <Link to="/" className="footer-link" style={{ display: "flex" }}>
              {LOGO}
              <Text c="light" t="h4" className="footer-app-title">
                {TITLE}
              </Text>
            </Link>
          </Tooltip>
        </Flexer>
        <Flexer key="item-container">
          <Flexer className="footer-item" key="sub-form">
            <Flexer j="c" a="c" fd="column">
              <Text t="h6" a="l" style={{ width: "90%" }}>
                Email Address
              </Text>
              <Input
                id="emailaddress"
                type="text"
                value={data.email}
                onChange={(e) => handleDataChange(e, setData, data)}
                name="email"
                style={{
                  width: "90%",
                  color: "#fff",
                  background: "#fff",
                  height: 30,
                }}
              />
              <Flexer j="c">
                {/* Add Icons / State Checkmark */}
                <Button
                  disabled={state === "success"}
                  color="secondary"
                  size="md"
                  style={{ marginTop: 16, fontSize: "1rem", width: 105 }}
                  onClick={() =>
                    setState(state === "success" ? "initial" : "success")
                  }
                >
                  {state === "success" && (
                    <Icon
                      icon={faCheck}
                      color="#f5f5f5"
                      mr={4}
                      ml={0}
                      fontSize="1.2rem"
                    />
                  )}
                  {state === "success" ? "Subscribed" : "Subscribe"}
                </Button>
              </Flexer>
            </Flexer>
          </Flexer>
          <Flexer className="footer-item" key="footer-links">
            <Flexer fd="column">
              {LINKS.map((link) => {
                if (!link.footer) {
                  return null;
                }
                return (
                  <div>
                    <Text>
                      <Tooltip text={`View ${link.text} Page`} position="right">
                        <Link
                          key={link.text}
                          to={link.to}
                          className="footer-link"
                        >
                          <Text t="body1" className="footer-link-text">
                            {link.text}
                          </Text>
                        </Link>
                      </Tooltip>
                    </Text>
                  </div>
                );
              })}
            </Flexer>
          </Flexer>
          <Flexer className="footer-item" fd="column">
            <Text t="h5" a="c" style={{ marginBottom: 2 }}>
              Connect with Us
            </Text>
            <Flexer j="c" a="c">
              {SOCIALS.map((platform) => {
                if (platform.handle) {
                  return (
                    <span style={{ marginRight: 4 }}>
                      <Tooltip text={platform.handle} position="bottom">
                        <IconButton
                          size="md"
                          fontSize="1.5rem"
                          icon={platform.icon}
                          invertColors
                          manualHoverColor={palettes.secondary.light}
                        />
                      </Tooltip>
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </Flexer>
          </Flexer>
        </Flexer>
        <Divider color="#a6a6a6" />
        <Text t="subtitle2" a="c" style={{ marginTop: 6 }}>
          © 2023 {TITLE}. All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default AppFooter;
