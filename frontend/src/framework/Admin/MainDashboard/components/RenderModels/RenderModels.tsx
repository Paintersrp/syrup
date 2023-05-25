import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./RenderModels.css";

import { ActionButton, Icon, ListItem, Tooltip } from "../../../../Base";
import { Flexer } from "../../../../Containers";

interface Model {
  url: string | null;
  visibility: boolean;
  verbose_name: string;
  model_name: string;
  keys: string[];
  metadata: any;
  search_keys: string[];
}

interface RenderModelsProps {
  modelItem: Model[];
  appName: string;
}

const RenderModels: React.FC<RenderModelsProps> = ({ modelItem, appName }) => {
  return (
    <div>
      {modelItem
        .filter((model) => model.url !== null)
        .map((model) => {
          if (model.visibility === false) {
            return null;
          }

          return (
            <Flexer className="hover-link" pl={12} key={model.model_name}>
              <Tooltip
                text={`View ${model.verbose_name} Model`}
                position="right"
                style={{ width: "100%" }}
              >
                <Link
                  to={`/admin/${model.model_name}`}
                  state={{
                    url: model.url,
                    keys: model.keys,
                    appName: appName,
                    model: model,
                    metadata: model.metadata,
                    searchKeys: model.search_keys,
                  }}
                >
                  <Flexer>
                    <Icon icon={faCode} size="1.1rem" />

                    <ListItem
                      //   icon={model.icon} change back to model.icon once redone
                      style={{ color: "black", width: "100%" }}
                      text={model.verbose_name}
                    />
                    <Link to={`/admin/${model.model_name}/control`}>
                      <Flexer
                        j="fe"
                        style={{
                          color: "black",
                        }}
                      >
                        <Tooltip
                          text={`Create ${model.verbose_name} Object`}
                          position="bottom"
                        >
                          <ActionButton
                            type="add"
                            size="t"
                            color="secondary"
                            style={{ marginRight: 16 }}
                            className="add-button"
                          />
                        </Tooltip>
                      </Flexer>
                    </Link>
                  </Flexer>
                </Link>
              </Tooltip>
            </Flexer>
          );
        })}
    </div>
  );
};

export default RenderModels;
