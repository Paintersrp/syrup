import React from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./PanelHeader.css";

import { IconButton, Text } from "../../../../Base";
import { Flexer } from "../../../../Containers";
import { RenderIcon } from "../../../MainDashboard/components/RenderIcon/RenderIcon";

function PanelHeader({ header, appName, open, toggleOpen }) {
  return (
    <div className="panel-header">
      <Flexer a="c" mt={2}>
        <RenderIcon appName={appName} className="panel-header-icon" />
        <Text t="h4">{header}</Text>
      </Flexer>
      <Flexer j="fe" a="c" grow>
        <IconButton
          size="t"
          fontSize="0.9rem"
          color="secondary"
          icon={open ? faChevronDown : faChevronUp}
          onClick={toggleOpen}
        />
      </Flexer>
    </div>
  );
}

export default PanelHeader;
