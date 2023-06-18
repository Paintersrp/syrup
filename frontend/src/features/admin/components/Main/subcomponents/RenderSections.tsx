import React from 'react';
import { Link } from 'react-router-dom';
import './RenderSections.css';

import RenderModels from './RenderModels';
import { RenderIcon } from './RenderIcon';
import { Flexer, Item, Surface } from '@/components/Containers';
import { List, Text, Tooltip } from '@/components/Elements';
import { IconButton } from '@/components/Buttons';
import { Collapser } from '@/components/Animation';
import { colors } from '@/theme/common';

interface RenderSectionsProps {
  models: Record<string, any>;
  configs: Record<string, any>;
  openAppSections: Record<string, boolean>;
  setOpenAppSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const RenderSections: React.FC<RenderSectionsProps> = ({
  models,
  configs,
  openAppSections,
  setOpenAppSections,
}) => {
  const sections: React.ReactNode[] = [];

  Object.entries(models).map(([appName, modelItem], index) => {
    const isOpen = Boolean(openAppSections[appName]);
    const toggleOpen = () => setOpenAppSections((prev) => ({ ...prev, [appName]: !isOpen }));

    if (configs[appName].visibility === false) {
      return null;
    }

    sections.push(
      <Item xs={12} sm={12} md={6} lg={4} key={appName} style={{ justifyContent: 'center' }}>
        <Surface maxWidth={325} boxShadow={0} px={0} py={0} mt={8} mb={8} pr={2} pl={2} j="c">
          <div className={`card-header ${!isOpen ? 'closed' : ''}`}>
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
                fontSize="21px"
                color="secondary"
                material={isOpen ? 'expand_more' : 'expand_less'}
                onClick={toggleOpen}
                iconColor="#fff"
              />
            </Flexer>
          </div>
          <Collapser isOpen={isOpen}>
            <div className="card-content">
              <List boxShadow={1} px={0} dividers className="list-border-radius">
                <RenderModels modelItem={modelItem} appName={appName} />
                <Flexer mt={0} j="fe" noSpacing>
                  <Link
                    to={`/admin/model/${appName}`}
                    style={{
                      marginRight:
                        appName !== 'general' && appName !== 'jobs' && appName !== 'authorization'
                          ? 8
                          : 16,
                      padding: '4px 0px 2px 0px',
                    }}
                  >
                    <Tooltip
                      text={`${appName.charAt(0).toUpperCase() + appName.slice(1)} App Admin`}
                      position="bottom"
                    >
                      <IconButton
                        className="launch-button"
                        fontSize="21px"
                        size="t"
                        material="admin_panel_settings"
                        iconColor={colors.info.dark}
                      />
                    </Tooltip>
                  </Link>
                  {appName !== 'general' && appName !== 'jobs' && appName !== 'authorization' && (
                    <Link
                      to={`/${appName === 'landing' ? '' : appName}`}
                      style={{ marginRight: 16, padding: '4px 0px 2px 0px' }}
                    >
                      <Tooltip text="View Site Page" position="bottom">
                        <IconButton
                          className="launch-button"
                          fontSize="18px"
                          size="t"
                          material="launch"
                          iconColor={colors.info.dark}
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

  return <React.Fragment>{sections}</React.Fragment>;
};

export default RenderSections;
