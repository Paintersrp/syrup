import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Breadcrumbs,
  IconButton,
  Text,
  Tooltip,
  useLoading,
} from "../../Components";
import { Container, Flexer, Item, Page, Surface } from "../../Containers";
import { AppDetails, AppLinks, AppStats } from "./components";
import { ApiAxiosInstance } from "../../../lib";
import { RecentActions } from "../AdminLog";

interface AppDashboardProps {}

const AppDashboard: React.FC<AppDashboardProps> = ({}) => {
  const { loading, startLoad, endLoad } = useLoading();

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [models, setModels] = useState<{}>({});
  const [config, setConfig] = useState<any>({});
  const [linksOpen, setLinksOpen] = useState<boolean>(false);
  const [appOpen, setAppOpen] = useState<boolean>(false);
  const [appStatsOpen, setAppStatsOpen] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { str } = useParams();

  const [recentActions, setRecentActions] = useState<any[]>([]);
  const [actionsOpen, setActionsOpen] = useState<boolean>(false);

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
    startLoad();
    ApiAxiosInstance.get(`/get_app/${str}/`)
      .then((response) => {
        setModels(response.data.models);
        setConfig(response.data.config);

        setTimeout(() => {
          setAppOpen(true);
          setAppStatsOpen(true);
          setActionsOpen(true);
          setLinksOpen(true);
        }, 0);
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
        endLoad();
      });

    ApiAxiosInstance.get(`/recent_admin_actions/?app=${str}`)
      .then((response) => {
        setRecentActions(response.data);
        setReady(true);
        endLoad();
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
        endLoad();
      });
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Page error={error}>
      <Surface
        maxWidth={1200}
        pt={32}
        pb={32}
        px={3}
        py={3}
        boxShadow={1}
        br={8}
        j="c"
      >
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
                fontSize="21px"
                size="t"
                material={collapsed ? "expand_more" : "expand_less"}
                onClick={collapsed ? handleOpenAll : handleCollapseAll}
                iconColor="#fff"
              />
            </Flexer>
            <Container a="fs">
              <Item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                align="flex-start"
                justify="flex-start"
              >
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
            <RecentActions
              actionsOpen={actionsOpen}
              setActionsOpen={setActionsOpen}
              recentActions={recentActions}
              appName={str && str.charAt(0).toUpperCase() + str.slice(1)}
              px={5.5}
              py={2}
            />
          </React.Fragment>
        )}
      </Surface>
    </Page>
  );
};

export default AppDashboard;
