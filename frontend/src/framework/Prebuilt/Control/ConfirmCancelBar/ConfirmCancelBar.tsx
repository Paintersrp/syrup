import React, { CSSProperties, ReactElement, ReactEventHandler } from "react";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import "./ConfirmCancelBar.css";

import { IconButton, Tooltip } from "../../../Base";
import { Flexer } from "../../../Containers";
import { TooltipPosition } from "../../../Base/Tooltip/Tooltip";

interface ConfirmCancelBarProps {
  handleConfirm: ReactEventHandler;
  handleCancel: ReactEventHandler;
  position?: TooltipPosition;
  justifyContent?: string;
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  style?: CSSProperties;
}

const ConfirmCancelBar: React.FC<ConfirmCancelBarProps> = ({
  handleConfirm,
  handleCancel,
  position = "top",
  justifyContent = "center",
  mt: marginTop,
  mb: marginBottom,
  style,
}): ReactElement => {
  return (
    <Flexer j={justifyContent} style={style} mb={marginBottom} mt={marginTop}>
      <Tooltip text="Confirm" position={position}>
        <IconButton
          size="md"
          fontSize="20px"
          aria-label="Confirm"
          onClick={handleConfirm}
          icon={faCheck}
          className="confirm-button"
        />
      </Tooltip>
      <Tooltip text="Cancel" position={position}>
        <IconButton
          size="md"
          fontSize="20px"
          aria-label="Cancel"
          onClick={handleCancel}
          icon={faClose}
          className="cancel-button"
        />
      </Tooltip>
    </Flexer>
  );
};

export default ConfirmCancelBar;
