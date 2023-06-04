import React from "react";
import "./AppDetails.css";

import { RenderModels } from "../../../MainDashboard/components";
import { Collapser, Surface } from "../../../../Containers";
import PanelHeader from "../PanelHeader/PanelHeader";
import { List } from "../../../../Components";

interface AppDetailsProps {
  models: { [key: string]: any };
  open: boolean;
  toggleOpen: () => void;
}

const AppDetails: React.FC<AppDetailsProps> = ({
  models,
  open,
  toggleOpen,
}) => {
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
      <PanelHeader header="App Models" open={open} toggleOpen={toggleOpen} />
      <Collapser isOpen={open}>
        <div className="card-content">
          <List boxShadow={1} px={0} dividers className="list-border-radius">
            {Object.entries(models).map(([appName, model], index) => {
              console.log(model);
              if (model[0].visibility === false) {
                return null;
              }
              return (
                <React.Fragment key={appName}>
                  <RenderModels modelItem={model} appName={appName} />
                </React.Fragment>
              );
            })}
          </List>
        </div>
      </Collapser>
    </Surface>
  );
};

export default AppDetails;
