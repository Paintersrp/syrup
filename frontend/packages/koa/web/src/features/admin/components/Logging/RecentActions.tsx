import { Dispatch, FC, Fragment, SetStateAction } from 'react';

import { Collapser } from '@/components/Animation';
import { IconButton } from '@/components/Buttons';
import { Surface } from '@/components/Containers';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  Tooltip,
} from '@/components/Elements';

import PanelHeader from '../Section/subcomponents/PanelHeader';

interface Action {
  user: string;
  action_time: string;
  app_label: string;
  model_name: string;
  change_message: string;
  obj_url: string;
}

interface RecentActionsProps {
  actionsOpen: boolean;
  setActionsOpen: Dispatch<SetStateAction<boolean>>;
  recentActions: Action[];
  appName?: string | null | undefined;
  modelName?: string | null;
  px?: number;
  py?: number;
}

export const RecentActions: FC<RecentActionsProps> = ({
  actionsOpen,
  setActionsOpen,
  recentActions,
  appName,
  modelName,
  px: paddingX = 0,
  py: paddingY = 0,
}) => {
  const handleExpandClick = () => {
    setActionsOpen(!actionsOpen);
  };

  const tableHeaders = ['User', 'Action Time', 'App Label', 'Model Name', 'Change Message', 'URL'];

  const bodyCells = ['user', 'action_time', 'app_label', 'model_name', 'change_message', 'url'];

  const renderBodyCellContent = (header: string, action: any) => {
    if (header === 'url') {
      const { obj_url } = action;
      if (obj_url === 'Not Applicable' || obj_url === 'Object not found' || obj_url === 'Failed') {
        return <Fragment>{obj_url}</Fragment>;
      } else {
        return <Link to={`${obj_url}`}>{obj_url}</Link>;
      }
    } else if (header === 'action_time') {
      return new Date(action.action_time).toLocaleString();
    } else {
      return action[header];
    }
  };

  return (
    <Surface px={paddingX} py={paddingY} boxShadow={0} pt={2.5} pb={2.5}>
      <PanelHeader
        header={`${appName || modelName} Recent Actions`}
        open={actionsOpen}
        toggleOpen={handleExpandClick}
        icon="timeline"
      >
        <Tooltip text="View Full Log" position="bottom">
          <Link
            // fix links
            to="/adminlog"
            state={{
              appName: appName ? appName : null,
              modelName: modelName ? modelName : null,
            }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <IconButton icon="auto_stories" size="tiny" palette="secondary" />
          </Link>
        </Tooltip>
      </PanelHeader>
      <Collapser isOpen={actionsOpen}>
        {recentActions.length > 0 ? (
          <TableContainer br={0} bs={1}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, index) => (
                    <TableCell key={index} a="center" fw="bolder">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActions.map((action, index) => (
                  <TableRow key={index}>
                    {bodyCells.map((header, cellIndex) => (
                      <TableCell key={cellIndex} a="center">
                        {renderBodyCellContent(header, action)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Surface br={0} boxShadow={1}>
            <Text t="h5" fw="500" a="c">
              No recent actions found.
            </Text>
          </Surface>
        )}
      </Collapser>
    </Surface>
  );
};
