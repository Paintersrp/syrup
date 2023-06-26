import { cloneElement, FC, ReactElement, useState } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { Icon } from '../../Media';
import { FAB } from '../FAB/FAB';
import { colors } from '@/theme/common';
import { css } from '@emotion/react';

// move
function formatPosition(position: string) {
  const parts = position.split('-');
  const formattedParts = parts.map((part, index) => {
    if (index === 0) {
      return part;
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  return formattedParts.join('');
}

// positional css needs work
export const cx: any = {
  speedDial: css({
    position: 'fixed',
    zIndex: 9999,
  }),
  topLeft: css({
    top: '20px',
    left: '20px',
  }),
  topRight: css({
    top: '20px',
    right: '20px',
  }),
  bottomLeft: css({
    bottom: '20px',
    left: '20px',
  }),
  bottomRight: css({
    bottom: '20px',
    right: '20px',
  }),
  mainFab: css({
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: '#2196f3',
    color: '#fff',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  mainFabHover: css({
    backgroundColor: '#1976d2',
  }),
  speedDialMenu: css({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'inherit',
    borderRadius: '4px',
    zIndex: 9998,
  }),
  up: css({
    bottom: 60,
    right: 0,
  }),
  down: css({
    top: 100,
    right: 10,
  }),
  left: css({
    left: '0px',
  }),
  right: css({
    left: '80px',
  }),
  speedDialItem: css({
    display: 'flex !important',
    alignItems: 'center !important',
    padding: '8px !important',
    backgroundColor: 'inherit',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }),
  itemNotLast: css({
    marginBottom: '8px',
  }),
  speedDialItemHover: css({
    backgroundColor: '#e0e0e0',
  }),
  speedDialLabel: css({
    marginLeft: '8px',
  }),
};

interface SpeedDialItemProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const SpeedDialItem: FC<SpeedDialItemProps> = ({ label, icon, onClick }) => (
  <button css={cx.speedDialItem} onClick={onClick}>
    <Icon size="24px" color={colors.secondary.main} icon={icon} />
  </button>
);

interface SpeedDialProps extends BaseProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  direction: 'up' | 'down' | 'left' | 'right';
  children: ReactElement<SpeedDialItemProps>[];
}

const SpeedDial: FC<SpeedDialProps> = ({ position, direction, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedPosition = formatPosition(position);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Base css={[cx.speedDial, cx[formattedPosition]]} {...rest}>
      <FAB
        position={position}
        icon={isOpen ? 'close' : 'add'}
        onClick={handleToggle}
        css={[cx.mainFab]}
        size="28px"
      />

      {isOpen && (
        <div css={[cx.speedDialMenu, cx[direction]]}>
          {children.map((child, index) => cloneElement(child, { key: index }))}
        </div>
      )}
    </Base>
  );
};

export { SpeedDial, SpeedDialItem };
