import React, { useEffect } from 'react';
import './Loading.css';

import { Icon } from '../../Media';

import { Flexer } from '../../Containers';
import { colors } from '@/theme/common';

interface LoadingProps {
  load: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ load }) => {
  useEffect(() => {
    const rootElement = document.documentElement;
    if (load) {
      rootElement.classList.add('no-scroll');
    } else {
      rootElement.classList.remove('no-scroll');
    }
    return () => {
      rootElement.classList.remove('no-scroll');
    };
  }, [load]);

  return (
    <div className={`overlay ${load ? 'overlay--active' : ''}`}>
      <div className="spinner">
        <div className="progress"></div>
      </div>
      <Flexer j="c" a="c">
        <Icon icon="circle" className="dot-icon dot-1" color={colors.secondary.main} />
        <Icon icon="circle" className="dot-icon dot-2" color={colors.secondary.main} />
        <Icon icon="circle" className="dot-icon dot-3" color={colors.secondary.main} />
      </Flexer>
    </div>
  );
};
