import { FC } from 'react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Link, ListItem, Tooltip } from '@/components/Elements';
import { Icon } from '@/components/Media';

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

export const RenderModels: FC<RenderModelsProps> = ({ modelItem, appName }) => {
  return (
    <div>
      {modelItem
        .filter((model) => model.url !== null)
        .map((model) => {
          if (model.visibility === false) {
            return null;
          }

          return (
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
              <Flexer
                p="8px 0 8px 12px"
                key={model.model_name}
                css={{
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Flexer j="c" a="c">
                  <Icon icon="code" size="1.2rem" color="tertiary" />
                  <ListItem
                    // icon="check"
                    //   icon={model.icon} change back to model.icon once redone
                    css={{ color: '#333', width: '100%' }}
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
              </Flexer>
            </Link>
          );
        })}
    </div>
  );
};
