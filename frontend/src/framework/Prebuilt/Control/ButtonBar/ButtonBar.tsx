import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  faScrewdriverWrench,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./ButtonBar.css";

import { IconButton, Tooltip } from "../../../Base";
import { Flexer } from "../../../Containers";

type ButtonBarProps = {
  justifyContent?: "flex-start" | "flex-end" | "center";
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  editClick?: () => void;
  deleteClick?: () => void;
  adminLink?: string;
  text?: string;
  obj?: string | number | null;
  iconColor?: string;
  mt?: CSSProperties["marginTop"];
};

const ButtonBar: React.FC<ButtonBarProps> = ({
  justifyContent = "flex-end",
  tooltipPosition = "bottom",
  editClick,
  deleteClick,
  adminLink,
  text = "",
  obj = null,
  iconColor = "secondary",
  mt: marginTop,
}) => {
  return (
    <Flexer j={justifyContent} mt={marginTop}>
      {editClick && (
        <Tooltip
          text={obj ? `Edit ${text} Object: ${obj}` : `Edit ${text}`}
          position={tooltipPosition}
        >
          <IconButton
            aria-label="Edit"
            size="small"
            fontSize="1.2rem"
            onClick={editClick}
            icon={faEdit}
            style={{ marginRight: 5, marginBottom: 5 }}
            className={`buttonbar-button-${iconColor}`}
          />
        </Tooltip>
      )}
      {deleteClick && (
        <Tooltip
          text={obj ? `Delete ${text} Object: ${obj}` : `Delete ${text}`}
          position={tooltipPosition}
        >
          <IconButton
            aria-label="Delete"
            size="small"
            fontSize="1.2rem"
            onClick={deleteClick}
            icon={faTrash}
            style={{ marginRight: 5, marginBottom: 5 }}
            className={`buttonbar-button-${iconColor}`}
          />
        </Tooltip>
      )}
      {adminLink && (
        <Tooltip text={`${text} Admin`} position={tooltipPosition}>
          <Link to={`/admin/${adminLink}`}>
            <IconButton
              aria-label="Admin Panel"
              size="small"
              fontSize="1.2rem"
              onClick={deleteClick}
              icon={faScrewdriverWrench}
              style={{ marginRight: 5, marginBottom: 5 }}
              className={`buttonbar-button-${iconColor}`}
            />
          </Link>
        </Tooltip>
      )}
    </Flexer>
  );
};

export default ButtonBar;
