import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { faScrewdriverWrench, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ButtonBar.css';
import { Flexer } from '@/components/Containers';
import { Tooltip } from '@/components/Elements';
import { IconButton } from '@/components/Buttons';

type ButtonBarProps = {
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  editClick?: () => void;
  deleteClick?: () => void;
  adminLink?: string;
  text?: string;
  obj?: string | number | null;
  iconColor?: string;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  dense?: boolean;
};

const ButtonBar: React.FC<ButtonBarProps> = ({
  justifyContent = 'flex-end',
  tooltipPosition = 'bottom',
  editClick,
  deleteClick,
  adminLink,
  text = '',
  obj = null,
  iconColor = 'secondary',
  mt: marginTop,
  mb: marginBottom,
  dense = 'false',
}) => {
  return (
    <Flexer j={justifyContent} mt={marginTop} mb={marginBottom}>
      {editClick && (
        <Tooltip
          text={obj ? `Edit ${text} Object: ${obj}` : `Edit ${text}`}
          position={tooltipPosition}
        >
          <IconButton
            aria-label="Edit"
            size={dense ? 'tiny' : `small`}
            fontSize={dense ? '1rem' : '1.2rem'}
            onClick={editClick}
            icon={faEdit}
            style={{ marginRight: dense ? 1 : 5, marginBottom: dense ? 1 : 5 }}
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
            size={dense ? 'tiny' : `small`}
            fontSize={dense ? '1rem' : '1.2rem'}
            onClick={deleteClick}
            icon={faTrash}
            style={{ marginRight: dense ? 1 : 5, marginBottom: dense ? 1 : 5 }}
            className={`buttonbar-button-${iconColor}`}
          />
        </Tooltip>
      )}
      {adminLink && (
        <Tooltip text={`${text} Admin`} position={tooltipPosition}>
          <Link to={`/admin/${adminLink}`}>
            <IconButton
              aria-label="Admin Panel"
              size={dense ? 'tiny' : `small`}
              fontSize={dense ? '1rem' : '1.2rem'}
              onClick={deleteClick}
              icon={faScrewdriverWrench}
              style={{
                marginRight: dense ? 0 : 5,
                marginBottom: dense ? 0 : 5,
              }}
              className={`buttonbar-button-${iconColor}`}
            />
          </Link>
        </Tooltip>
      )}
    </Flexer>
  );
};

export default ButtonBar;