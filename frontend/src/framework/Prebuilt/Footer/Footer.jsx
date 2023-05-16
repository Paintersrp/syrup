import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import BaseButton from "../../Base/BaseButton/BaseButton";
import BaseInput from "../../Base/BaseInput/BaseInput";
import Divider from "../../Base/Divider/Divider";
import Flexer from "../../Base/Flexer/Flexer";
import Text from "../../Base/Text/Text";
import Tooltip from "../../Base/Tooltip/Tooltip";

import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";
import { LOGO, SOCIALS, LINKS, TITLE } from "../../../settings";

const Footer = ({}) => {
  const [state, setState] = useState("initial");

  return (
    <div className="footer-root">
      <div className="footer-container">
        <Flexer mb={0} j="c">
          <Tooltip text="View Home Page" position="right">
            <Link href="/" className="footer-link" style={{ display: "flex" }}>
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
              <BaseInput
                id="emailaddress"
                type="text"
                // value={data.name}
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
                <BaseButton
                  color="secondary"
                  size="md"
                  style={{ marginTop: 8, fontSize: "1rem" }}
                  onClick={() =>
                    setState(state === "success" ? "initial" : "success")
                  }
                >
                  {state === "success" ? "Subscribed" : "Subscribe"}
                </BaseButton>
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
            <Text t="h5" style={{ marginBottom: 2 }}>
              Connect with Us
            </Text>
            <Flexer j="c" a="c">
              {SOCIALS.map((platform) => {
                if (platform.handle) {
                  return (
                    <span style={{ marginRight: 4 }}>
                      <Tooltip text={platform.handle} position="bottom">
                        {platform.icon}
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
        <Text t="subtitle2" style={{ marginTop: 6 }}>
          © 2023 {TITLE}. All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default Footer;
