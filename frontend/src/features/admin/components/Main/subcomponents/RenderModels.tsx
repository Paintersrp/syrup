import React from 'react';

import './RenderModels.css';

import { Flexer } from '@/components/Containers';
import { Link, ListItem, Tooltip } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { IconButton } from '@/components/Buttons';
import { colors } from '@/theme/common';

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
                style={{ width: '100%' }}
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
                    <Icon icon="code" size="1.1rem" />
                    <ListItem
                      icon="check"
                      //   icon={model.icon} change back to model.icon once redone
                      style={{ color: 'black', width: '100%' }}
                      text={model.verbose_name}
                    />
                    <Link to={`/admin/${model.model_name}/control`}>
                      <Flexer
                        j="fe"
                        style={{
                          color: 'black',
                        }}
                      >
                        <Tooltip text={`Create ${model.verbose_name} Object`} position="bottom">
                          <IconButton
                            icon="add"
                            size="tiny"
                            style={{ marginRight: 16 }}
                            variant="hover"
                            palette="success"
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
