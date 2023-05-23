import React, { useState, useEffect } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

import { Breadcrumbs, IconButton, Text } from "../../Base";
import { Container, Content, Flexer, Page } from "../../Containers";
import RenderSections from "./components/RenderSections/RenderSections";
import axiosInstance from "../../../lib/Axios/axiosInstance";

function Dashboard() {
  const [models, setModels] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [configs, setConfigs] = useState({});
  const [openAppSections, setOpenAppSections] = useState({});

  const [recentActions, setRecentActions] = useState([]);
  const [actionsOpen, setActionsOpen] = useState(false);
  //   const [statsOpen, setStatsOpen] = useState(false);

  const handleCollapseAll = () => {
    const closedAppSections = {};
    Object.keys(models).forEach((app) => {
      closedAppSections[app] = false;
    });
    setOpenAppSections(closedAppSections);
    setActionsOpen(false);
    // setStatsOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    const initialOpenAppSections = {};
    Object.keys(models).forEach((app) => {
      initialOpenAppSections[app] = true;
    });
    setOpenAppSections(initialOpenAppSections);
    setActionsOpen(true);
    // setStatsOpen(true);
    setCollapsed(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data.models);
        setConfigs(response.data.configs);
        console.log("Models: ", response.data.models);

        const initialOpenAppSections = {};
        Object.keys(response.data.models).forEach((app) => {
          initialOpenAppSections[app] = true;
        });
        setOpenAppSections(initialOpenAppSections);
        setActionsOpen(true);
        // setStatsOpen(true);
      })
      .catch((error) => console.log(error));

    axiosInstance
      .get("/recent_admin_actions/")
      .then((response) => {
        setRecentActions(response.data);
        console.log("recent actions: ", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Page>
      <Content maxWidth={1200} pt={4} pb={4} pad={3} boxShadow={1} br={0}>
        {Object.keys(models).length > 0 && (
          <React.Fragment>
            <Flexer>
              <Text w="auto" t="h3" className="breadcrumb-title">
                Dashboard
              </Text>
              <Breadcrumbs aria-label="breadcrumb">
                <Text c="textPrimary">Dashboard</Text>
              </Breadcrumbs>
            </Flexer>

            <Flexer fd="column" j="c">
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
              <Container spacing={0} className="dash-inner-container">
                {RenderSections({
                  models,
                  configs,
                  openAppSections,
                  setOpenAppSections,
                })}
              </Container>
              {/* <RecentActions
              actionsOpen={actionsOpen}
              setActionsOpen={setActionsOpen}
              recentActions={recentActions}
            /> */}
            </Flexer>
          </React.Fragment>
        )}
      </Content>
    </Page>
  );
}

export default Dashboard;

{
  /*  
  <Statistics
    statsOpen={statsOpen}
    setStatsOpen={setStatsOpen}
    numCustomers={1000}
    avgSatisfaction={4.5}
    numProjectsCompleted={500}
    revenue={10000}
    teamSize={10}
  />
  */
}
