import { CSSProperties, FC } from 'react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Link, Tooltip } from '@/components/Elements';

type ButtonBarProps = {
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  editClick?: () => void;
  deleteClick?: () => void;
  adminLink?: string;
  text?: string;
  obj?: string | number | null;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  dense?: boolean;
};

export const ButtonBar: FC<ButtonBarProps> = ({
  justifyContent = 'flex-end',
  tooltipPosition = 'bottom',
  editClick,
  deleteClick,
  adminLink,
  text = '',
  obj = null,
  mt: marginTop,
  mb: marginBottom,
  dense = 'false',
}) => {
  return (
    <Flexer j={justifyContent} mt={marginTop} mb={marginBottom} gap={2}>
      {editClick && (
        <Tooltip
          text={obj ? `Edit ${text} Object: ${obj}` : `Edit ${text}`}
          position={tooltipPosition}
        >
          <IconButton
            variant="hover"
            aria-label="Edit"
            size={dense ? 'tiny' : `sm`}
            onClick={editClick}
            icon="edit"
            style={{ marginRight: dense ? 1 : 5, marginBottom: dense ? 1 : 5 }}
            palette="primary"
          />
        </Tooltip>
      )}
      {deleteClick && (
        <Tooltip
          text={obj ? `Delete ${text} Object: ${obj}` : `Delete ${text}`}
          position={tooltipPosition}
        >
          <IconButton
            variant="hover"
            aria-label="Delete"
            size={dense ? 'tiny' : `sm`}
            onClick={deleteClick}
            icon="delete"
            style={{ marginRight: dense ? 1 : 5, marginBottom: dense ? 1 : 5 }}
            palette="error"
          />
        </Tooltip>
      )}
      {adminLink && (
        <Tooltip text={`${text} Admin`} position={tooltipPosition}>
          <Link to={`/admin/${adminLink}`}>
            <IconButton
              variant="hover"
              aria-label="Admin Panel"
              size={dense ? 'tiny' : `sm`}
              onClick={deleteClick}
              icon="admin_panel_settings"
              palette="primary"
              style={{
                marginRight: dense ? 0 : 5,
                marginBottom: dense ? 0 : 5,
              }}
            />
          </Link>
        </Tooltip>
      )}
    </Flexer>
  );
};
