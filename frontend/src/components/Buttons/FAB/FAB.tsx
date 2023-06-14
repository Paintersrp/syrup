import React, { CSSProperties } from 'react';
import './FAB.css';

import { Base, BaseProps, Tooltip } from '../../Elements';
import { MaterialIcon } from '../../Media';

interface FABProps extends BaseProps {
  icon: string;
  label?: string;
  tooltip?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick: () => void;
  size?: string | undefined;
  style?: CSSProperties;
  className?: string;
}

const FAB: React.FC<FABProps> = ({
  icon,
  label,
  tooltip,
  position = 'bottom-right',
  onClick,
  size = '24px',
  className,
  style,
  ...rest
}) => {
  const containerStyle: CSSProperties = {
    position: 'fixed',
    bottom: position.includes('bottom') ? '30px' : 'unset',
    top: position.includes('top') ? '70px' : 'unset',
    right: position.includes('right') ? '50px' : 'unset',
    left: position.includes('left') ? '50px' : 'unset',
    zIndex: 100,
    ...style,
  };

  const button = (
    <button className="fab-button" onClick={onClick}>
      <MaterialIcon icon={icon} color="#fff" size={size} />
      {label && <span className="fab-label">{label}</span>}
    </button>
  );

  return (
    <Base className={`fab-container ${className}`} style={containerStyle} {...rest}>
      {tooltip ? (
        <Tooltip text={tooltip} position={position.includes('top') ? 'bottom' : 'top'}>
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </Base>
  );
};

export default FAB;
