import React from "react";
import "./AppDetails.css";

import { Collapser, List } from "../../../../Base";
import { Surface } from "../../../../Containers";
import { RenderModels } from "../../../MainDashboard/components/RenderModels/RenderModels";
import PanelHeader from "../PanelHeader/PanelHeader";

function AppDetails({ models, open, toggleOpen }) {
  console.log(models);
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
      <PanelHeader
        header="App Models"
        appName="models"
        open={open}
        toggleOpen={toggleOpen}
      />
      <Collapser isOpen={open}>
        <div className="card-content">
          <List boxShadow={1} px={0} divider className="list-border-radius">
            {Object.entries(models).map(([appName, model], index) => {
              console.log(model);
              if (model[0].visibility === false) {
                return null;
              }
              return (
                <React.Fragment>
                  {RenderModels({
                    modelItem: model,
                    appName,
                  })}
                </React.Fragment>
              );
            })}
          </List>
        </div>
      </Collapser>
    </Surface>
  );
}

export default AppDetails;
