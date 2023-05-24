import React from "react";
import {
  faChevronDown,
  faChevronUp,
  faScrewdriverWrench,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./RenderSections.css";

import { Link } from "react-router-dom";
import { Flexer, Item, Surface } from "../../../../Containers";
import { Collapser, IconButton, List, Text, Tooltip } from "../../../../Base";
import { RenderIcon } from "../../../MainDashboard/components/RenderIcon/RenderIcon";
import { RenderModels } from "../../../MainDashboard/components/RenderModels/RenderModels";

export function RenderSections({
  models,
  configs,
  openAppSections,
  setOpenAppSections,
}) {
  const sections = [];
  Object.entries(models).map(([appName, modelItem], index) => {
    // console.log("modelItem", modelItem);
    // console.log("config: ", configs[appName]);
    const isOpen = Boolean(openAppSections[appName]);
    const toggleOpen = () =>
      setOpenAppSections((prev) => ({ ...prev, [appName]: !isOpen }));

    if (configs[appName].visibility === false) {
      return null;
    }

    sections.push(
      <Item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        key={appName}
        style={{ justifyContent: "center" }}
      >
        <Surface
          maxWidth={1200}
          boxShadow={0}
          px={0}
          py={0}
          mt={8}
          mb={8}
          pr={2}
          pl={2}
        >
          <div className="card-header">
            <Link
              to={`/admin/model/${appName}`}
              state={{
                appName: appName,
              }}
              key={appName}
            >
              <Flexer a="c" mt={2}>
                <RenderIcon appName={appName} className="model-icon" />
                <Text t="h4" className="hover-app-link">
                  {appName.charAt(0).toUpperCase() + appName.slice(1)}
                </Text>
              </Flexer>
            </Link>
            <Flexer j="fe" a="c" grow>
              <IconButton
                size="t"
                fontSize="0.9rem"
                color="secondary"
                icon={isOpen ? faChevronDown : faChevronUp}
                onClick={toggleOpen}
              />
            </Flexer>
          </div>
          <Collapser isOpen={isOpen}>
            <div className="card-content">
              <List boxShadow={1} px={0} divider className="list-border-radius">
                {RenderModels({
                  modelItem,
                  appName,
                })}
                <Flexer mt={0} j="fe" noSpacing>
                  <Link
                    to={`/admin/model/${appName}`}
                    style={{
                      marginRight:
                        appName !== "general" &&
                        appName !== "jobs" &&
                        appName !== "authorization"
                          ? 8
                          : 16,
                      padding: "4px 0px 2px 0px",
                    }}
                  >
                    <Tooltip
                      text={`${
                        appName.charAt(0).toUpperCase() + appName.slice(1)
                      } App Admin`}
                      position="bottom"
                    >
                      <IconButton
                        className="launch-button"
                        icon={faScrewdriverWrench}
                        size="t"
                      />
                    </Tooltip>
                  </Link>
                  {appName !== "general" &&
                    appName !== "jobs" &&
                    appName !== "authorization" && (
                      <Link
                        to={`/${appName === "landing" ? "" : appName}`}
                        style={{ marginRight: 16, padding: "4px 0px 2px 0px" }}
                      >
                        <Tooltip text="View Site Page" position="bottom">
                          <IconButton
                            className="launch-button"
                            size="t"
                            icon={faUpRightFromSquare}
                          />
                        </Tooltip>
                      </Link>
                    )}
                </Flexer>
              </List>
            </div>
          </Collapser>
        </Surface>
      </Item>
    );
  });

  return sections;
}
