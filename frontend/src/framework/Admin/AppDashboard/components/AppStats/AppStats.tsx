import React from "react";
import "./AppStats.css";

import { List, ListItem } from "../../../../Base";
import PanelHeader from "../PanelHeader/PanelHeader";
import { Collapser, Surface } from "../../../../Containers";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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

const AppStats: React.FC<AppStatsProps> = ({
  numModels,
  numObjects,
  models,
  open,
  toggleOpen,
}) => {
  return (
    <Surface
      className="app-stats-root"
      j="fs"
      a="c"
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
            icon={faChevronDown}
            text="Number of Models"
            subtext={numModels.toString()}
            textAlign="right"
          />
          <ListItem
            icon={faChevronDown}
            text="Number of Objects"
            subtext={numObjects.toString()}
            textAlign="right"
          />

          {models.map((model) => {
            console.log(model);
            if (model.visibility === false) {
              return null;
            }
            return (
              <ListItem
                key={model.name}
                icon={faChevronDown}
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
