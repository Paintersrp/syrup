import React from 'react';
import './css/AppStats.css';

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

const AppStats: React.FC<AppStatsProps> = ({ numModels, numObjects, models, open, toggleOpen }) => {
  return (
    <Surface
      className="app-stats-root"
      j="fs"
      maxWidth={1200}
      boxShadow={0}
      px={0}
      py={0}
      mt={8}
      mb={8}
      pr={2}
      pl={2}
    >
      <PanelHeader header="Statistics" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <List px={0} className="app-stats-list">
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

export default AppStats;
