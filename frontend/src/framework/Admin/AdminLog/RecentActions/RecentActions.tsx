import React from "react";
import { Link } from "react-router-dom";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  Tooltip,
} from "../../../Components";
import { PanelHeader } from "../../AppDashboard/components";
import { Collapser, Surface } from "../../../Containers";

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
  setActionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recentActions: Action[];
  appName?: string | null | undefined;
  modelName?: string | null;
  px?: number;
  py?: number;
}

function RecentActions({
  actionsOpen,
  setActionsOpen,
  recentActions,
  appName,
  modelName,
  px: paddingX = 0,
  py: paddingY = 0,
}: RecentActionsProps) {
  const handleExpandClick = () => {
    setActionsOpen(!actionsOpen);
  };

  const tableHeaders = [
    "User",
    "Action Time",
    "App Label",
    "Model Name",
    "Change Message",
    "URL",
  ];

  const bodyCells = [
    "user",
    "action_time",
    "app_label",
    "model_name",
    "change_message",
    "url",
  ];

  const renderBodyCellContent = (header: string, action: Action) => {
    if (header === "url") {
      const { obj_url } = action;
      if (
        obj_url === "Not Applicable" ||
        obj_url === "Object not found" ||
        obj_url === "Failed"
      ) {
        return <React.Fragment>{obj_url}</React.Fragment>;
      } else {
        return (
          <Link className="link-text" to={`${obj_url}`}>
            {obj_url}
          </Link>
        );
      }
    } else if (header === "action_time") {
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
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton
              material="auto_stories"
              size="t"
              fontSize="16px"
              color="secondary"
            />
          </Link>
        </Tooltip>
      </PanelHeader>
      <Collapser isOpen={actionsOpen}>
        {recentActions.length > 0 ? (
          <TableContainer br={0}>
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
}

export default RecentActions;
