import { FC } from 'react';

import PanelHeader from './PanelHeader';
import { Flexer, Surface } from '@/components/Containers';
import { Collapser } from '@/components/Animation';
import { Link, List, ListItem, Tooltip } from '@/components/Elements';

interface AppLinksProps {
  appName: string | undefined;
  links: { [key: string]: string };
  open: boolean;
  toggleOpen: () => void;
}

export const AppLinks: FC<AppLinksProps> = ({ appName, links, open, toggleOpen }) => {
  return (
    <Surface j="fs" maxWidth={325} boxShadow={1} px={0} py={0} pr={2} pl={2} m={24}>
      <PanelHeader header="Links" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <div>
          <List boxShadow={0} px={0} dividers>
            {Object.entries(links).map(([linkName, link], index) => {
              return (
                <Flexer
                  p="8px 0 8px 12px"
                  key={linkName}
                  css={{
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Tooltip text={`View ${linkName}`} position="right" style={{ width: '100%' }}>
                    <Link
                      to={`${link}`}
                      state={{
                        appName: linkName.includes('Analysis') ? null : appName,
                      }}
                    >
                      <Flexer>
                        <ListItem
                          icon="code"
                          css={{ color: '#333', width: '100%' }}
                          text={linkName}
                          textAlign="right"
                        />
                      </Flexer>
                    </Link>
                  </Tooltip>
                </Flexer>
              );
            })}
          </List>
        </div>
      </Collapser>
    </Surface>
  );
};
