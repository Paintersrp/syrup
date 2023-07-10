import React from 'react';

import PanelHeader from './PanelHeader';
import { Surface } from '@/components/Containers';
import { Collapser } from '@/components/Animation';
import { List, ListItem } from '@/components/Elements';

interface Model {
  name: string;
  num_objects: number;
  visibility: boolean;
}

interface AppStatsProps {
  numModels: number;
  numObjects: number;
  models: Model[];
  open: boolean;
  toggleOpen: () => void;
}

export const AppStats: React.FC<AppStatsProps> = ({
  numModels,
  numObjects,
  models,
  open,
  toggleOpen,
}) => {
  return (
    <Surface j="fs" maxWidth={325} boxShadow={1} px={0} py={0} pr={2} pl={2} m={24}>
      <PanelHeader header="Statistics" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <List boxShadow={0} px={0}>
          <ListItem
            icon="expand_more"
            text="Number of Models"
            subtext={numModels.toString()}
            textAlign="right"
            d="flex"
          />
          <ListItem
            icon="expand_more"
            text="Number of Objects"
            subtext={numObjects.toString()}
            textAlign="right"
          />
          {models.map((model) => {
            if (model.visibility === false) {
              return null;
            }
            return (
              <ListItem
                key={model.name}
                icon="expand_more"
                text={model.name}
                subtext={`${model.num_objects} objects`}
                textAlign="right"
              />
            );
          })}
        </List>
      </Collapser>
    </Surface>
  );
};
