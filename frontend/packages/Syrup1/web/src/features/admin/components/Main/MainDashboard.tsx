import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { Breadcrumbs, Text } from '@/components/Elements';
import { axios } from '@/lib/api';
import { Page } from '@/components/Layout';
import { Container, Flexer, Surface } from '@/components/Containers';
import { IconButton } from '@/components/Buttons';
import { inject } from '@/theme/utils';

import { RecentActions } from '../Logging/RecentActions';
import { RenderSections } from './subcomponents/RenderSections';
import { AdminBreadcrumbs } from './subcomponents/AdminBreadcrumbs';

interface MainDashboardProps {}

const MainDashboard: React.FC<MainDashboardProps> = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>(null);

  const [models, setModels] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [configs, setConfigs] = useState({});
  const [openAppSections, setOpenAppSections] = useState<any>({});

  const [recentActions, setRecentActions] = useState([]);
  const [actionsOpen, setActionsOpen] = useState(false);
  //   const [statsOpen, setStatsOpen] = useState(false);

  const handleCollapseAll = () => {
    const closedAppSections: any = {};
    Object.keys(models).forEach((app) => {
      closedAppSections[app] = false;
    });
    setOpenAppSections(closedAppSections);
    setActionsOpen(false);
    // setStatsOpen(false);
    setCollapsed(true);
  };

  const handleOpenAll = () => {
    const initialOpenAppSections: any = {};
    Object.keys(models).forEach((app) => {
      initialOpenAppSections[app] = true;
    });
    setOpenAppSections(initialOpenAppSections);
    setActionsOpen(true);
    // setStatsOpen(true);
    setCollapsed(false);
  };

  useEffect(() => {
    axios
      .get('/get_models/')
      .then((response) => {
        setModels(response.data.models);
        setConfigs(response.data.configs);

        const initialOpenAppSections: any = {};
        Object.keys(response.data.models).forEach((app) => {
          initialOpenAppSections[app] = true;
        });
        setTimeout(() => {
          setOpenAppSections(initialOpenAppSections);
          setActionsOpen(true);
          // setStatsOpen(true);
        }, 0);
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
      });

    axios
      .get('/recent_admin_actions/')
      .then((response) => {
        setRecentActions(response.data);
        setReady(true);
      })
      .catch((err) => {
        setError(err.error);
        setReady(true);
      });
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Page>
      <Surface maxWidth={1200} pt={32} pb={32} px={3} py={3} boxShadow={1} br={8} j="c">
        {Object.keys(models).length > 0 && (
          <React.Fragment>
            <AdminBreadcrumbs title="Dashboard">
              <Text c="textPrimary">Dashboard</Text>
            </AdminBreadcrumbs>

            <Flexer fd="column" j="c">
              <Flexer j="fe" a="c">
                <Text w="auto" mr={8}>
                  {collapsed ? 'Open All' : 'Collapse All'}
                </Text>
                <IconButton
                  size="tiny"
                  icon={collapsed ? 'expand_more' : 'expand_less'}
                  onClick={collapsed ? handleOpenAll : handleCollapseAll}
                />
              </Flexer>
              <Container j="fs" a="fs">
                <RenderSections
                  models={models}
                  configs={configs}
                  openAppSections={openAppSections}
                  setOpenAppSections={setOpenAppSections}
                />
              </Container>
              <RecentActions
                actionsOpen={actionsOpen}
                setActionsOpen={setActionsOpen}
                recentActions={recentActions}
                appName=""
                modelName=""
                px={1.5}
                py={1}
              />
            </Flexer>
          </React.Fragment>
        )}
      </Surface>
    </Page>
  );
};

export default MainDashboard;

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
