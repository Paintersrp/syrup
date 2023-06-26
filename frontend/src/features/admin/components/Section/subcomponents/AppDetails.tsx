import { FC } from 'react';
import { css } from '@emotion/react';

import PanelHeader from './PanelHeader';
import { Collapser } from '@/components/Animation';
import { List } from '@/components/Elements';
import { Surface } from '@/components/Containers';
import { inject } from '@/theme/utils';

import { RenderModels } from '../../Main/subcomponents/RenderModels';

const styles = (theme: any) => ({
  list: css({
    borderTopRightRadius: '0px !important',
    borderTopLeftRadius: '0px !important',
  }),
});

interface AppDetailsProps {
  models: { [key: string]: any };
  open: boolean;
  toggleOpen: () => void;
}

export const AppDetails: FC<AppDetailsProps> = ({ models, open, toggleOpen }) => {
  const css = inject(styles);

  return (
    <Surface j="fs" maxWidth={325} boxShadow={1} px={0} py={0} pr={2} pl={2} m={24}>
      <PanelHeader header="App Models" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <List boxShadow={0} px={0}>
          {Object.entries(models).map(([appName, model], index) => {
            if (model[0].visibility === false) {
              return null;
            }
            return <RenderModels key={appName} modelItem={model} appName={appName} />;
          })}
        </List>
      </Collapser>
    </Surface>
  );
};
