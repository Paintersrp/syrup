import React, { useEffect } from 'react';
import './Loading.css';

import { MaterialIcon } from '../../Media';
import { palettes } from '../../../utils';
import { Flexer } from '../../Containers';

interface LoadingProps {
  load: boolean;
}

const Loading: React.FC<LoadingProps> = ({ load }) => {
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
        <MaterialIcon icon="circle" className="dot-icon dot-1" color={palettes.secondary.main} />
        <MaterialIcon icon="circle" className="dot-icon dot-2" color={palettes.secondary.main} />
        <MaterialIcon icon="circle" className="dot-icon dot-3" color={palettes.secondary.main} />
      </Flexer>
    </div>
  );
};

export default Loading;
