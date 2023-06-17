import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';

import { Base, BaseProps, Tooltip } from '../../Elements';
import { MaterialIcon } from '../../Media';

const fabCx = {
  fabButton: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#2196f3',
    color: '#ffffff',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }),
};

interface FABProps extends BaseProps {
  icon: string;
  tooltip?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick: () => void;
  size?: string | undefined;
  style?: CSSProperties;
  className?: string;
}

export const FAB: React.FC<FABProps> = ({
  icon,
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
    <button css={fabCx.fabButton} onClick={onClick}>
      <MaterialIcon icon={icon} color="#fff" size={size} />
    </button>
  );

  return (
    <Base className={clsx(className)} d="f" a="c" j="c" style={containerStyle} {...rest}>
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
