import { Dispatch, FC, Fragment, ReactNode, SetStateAction } from 'react';

import { Collapser } from '@/components/Animation';
import { IconButton } from '@/components/Buttons';
import { Flexer, Item, Surface } from '@/components/Containers';
import { Link, List, Text, Tooltip } from '@/components/Elements';

import { AdminCardHeader } from './AdminCardHeader';
import { RenderModels } from './RenderModels';
import { RenderIcon } from './RenderIcon';
import { CapitalizeFirst } from '@/utils';

interface RenderSectionsProps {
  models: Record<string, any>;
  configs: Record<string, any>;
  openAppSections: Record<string, boolean>;
  setOpenAppSections: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export const RenderSections: FC<RenderSectionsProps> = ({
  models,
  configs,
  openAppSections,
  setOpenAppSections,
}) => {
  const sections: ReactNode[] = [];

  Object.entries(models).map(([appName, modelItem], index) => {
    const isOpen = Boolean(openAppSections[appName]);
    const toggleOpen = () => setOpenAppSections((prev) => ({ ...prev, [appName]: !isOpen }));

    if (configs[appName].visibility === false) {
      return null;
    }

    const linkPaddingRight =
      appName !== 'general' && appName !== 'jobs' && appName !== 'authorization' ? 8 : 16;

    const formattedAppName = CapitalizeFirst(appName);

    sections.push(
      <Item xs={12} sm={12} md={6} lg={4} key={appName} j="c">
        <Surface maxWidth={325} boxShadow={1} px={0} py={0} mt={8} mb={8} pr={2} pl={2} j="c">
          <AdminCardHeader isOpen={isOpen}>
            <Link
              to={`/admin/model/${appName}`}
              state={{
                appName: appName,
              }}
              key={appName}
            >
              <Flexer a="c" mt={2}>
                <RenderIcon appName={appName} />
                <Text t="h4" c="light">
                  {formattedAppName}
                </Text>
              </Flexer>
            </Link>
            <Flexer j="fe" a="c" grow>
              <IconButton
                size="tiny"
                color="secondary"
                icon={isOpen ? 'expand_more' : 'expand_less'}
                onClick={toggleOpen}
              />
            </Flexer>
          </AdminCardHeader>
          <Collapser isOpen={isOpen}>
            <List boxShadow={0} px={0} dividers>
              <RenderModels modelItem={modelItem} appName={appName} />
              <Flexer mt={0} j="fe" noSpacing>
                <Link
                  to={`/admin/model/${appName}`}
                  style={{
                    padding: '4px 0 2px 0',
                    paddingRight: linkPaddingRight,
                  }}
                >
                  <Tooltip text={`${formattedAppName} App Admin`}>
                    <IconButton
                      variant="hover"
                      palette="info"
                      size="tiny"
                      icon="admin_panel_settings"
                    />
                  </Tooltip>
                </Link>
                {appName !== 'general' && appName !== 'jobs' && appName !== 'authorization' && (
                  <Link
                    to={`/${appName === 'landing' ? '' : appName}`}
                    style={{ padding: '4px 16px 2px 0px' }}
                  >
                    <Tooltip text="View Site Page">
                      <IconButton variant="hover" palette="info" size="tiny" icon="launch" />
                    </Tooltip>
                  </Link>
                )}
              </Flexer>
            </List>
          </Collapser>
        </Surface>
      </Item>
    );
  });

  return <Fragment>{sections}</Fragment>;
};
