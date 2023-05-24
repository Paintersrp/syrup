import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Breadcrumbs, IconButton, Text, Tooltip } from "../../Base";
import { Container, Content, Flexer, Item, Page } from "../../Containers";
import { AppDetails, AppLinks, AppStats } from "./components";
import { ApiAxiosInstance } from "../../../utils";

function AppDashboard() {
  const [models, setModels] = useState({});
  const [config, setConfig] = useState<any>({});
  const [linksOpen, setLinksOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [appStatsOpen, setAppStatsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { str } = useParams();

  const [recentActions, setRecentActions] = useState([]);
  const [actionsOpen, setActionsOpen] = useState(false);

  const handleCollapseAll = () => {
    setAppOpen(false);
    setAppStatsOpen(false);
    setActionsOpen(false);
    setLinksOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    setAppOpen(true);
    setAppStatsOpen(true);
    setActionsOpen(true);
    setLinksOpen(true);
    setCollapsed(false);
  };

  const toggleAppOpen = () => {
    setAppOpen(!appOpen);
  };

  const toggleLinksOpen = () => {
    setLinksOpen(!linksOpen);
  };

  const toggleAppStatsOpen = () => {
    setAppStatsOpen(!appStatsOpen);
  };

  useEffect(() => {
    ApiAxiosInstance.get(`/get_app/${str}/`)
      .then((response) => {
        setModels(response.data.models);
        setConfig(response.data.config);
        setTimeout(() => {
          setAppOpen(true);
          setAppStatsOpen(true);
          setActionsOpen(true);
          setLinksOpen(true);
        }, 100);
      })
      .catch((error) => console.log(error));

    ApiAxiosInstance.get(`/recent_admin_actions/?app=${str}`)
      .then((response) => {
        setRecentActions(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Page>
      <Content maxWidth={1200} pt={4} pb={4} pad={3} boxShadow={1} br={1}>
        {Object.keys(models).length > 0 && (
          <React.Fragment>
            <Flexer>
              <Text w="auto" t="h3" className="breadcrumb-title">
                App Overview
              </Text>
              <Breadcrumbs aria-label="breadcrumb" style={{ display: "flex" }}>
                <Tooltip text="View Dashboard" position="bottom">
                  <Link className="link-text" to="/admin">
                    <Text>Dashboard</Text>
                  </Link>
                </Tooltip>
                <Text>
                  {str
                    ? str.charAt(0).toUpperCase() + str.slice(1)
                    : "Unavailablle"}
                </Text>
              </Breadcrumbs>
            </Flexer>
            <Text t="h2" a="center">
              {str && str.charAt(0).toUpperCase() + str.slice(1)} App Overview
            </Text>
            <Flexer j="fe" a="c">
              <Text w="auto" mr={8}>
                {collapsed ? "Open All" : "Collapse All"}
              </Text>
              <IconButton
                fontSize="0.8rem"
                size="t"
                icon={collapsed ? faChevronDown : faChevronUp}
                onClick={collapsed ? handleOpenAll : handleCollapseAll}
              />
            </Flexer>
            <Container>
              <Item xs={12} sm={12} md={6} lg={4}>
                <AppStats
                  numModels={config.app_info.num_models}
                  numObjects={config.app_info.num_objects}
                  models={config.app_info.models}
                  open={appStatsOpen}
                  toggleOpen={toggleAppStatsOpen}
                />
              </Item>
              <Item xs={12} sm={12} md={6} lg={4}>
                <AppDetails
                  models={models}
                  open={appOpen}
                  toggleOpen={toggleAppOpen}
                />
              </Item>
              <Item xs={12} sm={12} md={6} lg={4}>
                <AppLinks
                  appName={str}
                  links={config.links}
                  open={linksOpen}
                  toggleOpen={toggleLinksOpen}
                />
              </Item>
            </Container>
            {/* <RecentActions
              actionsOpen={actionsOpen}
              setActionsOpen={setActionsOpen}
              recentActions={recentActions}
              appName={str}
            /> */}
          </React.Fragment>
        )}
      </Content>
    </Page>
  );
}

export default AppDashboard;
