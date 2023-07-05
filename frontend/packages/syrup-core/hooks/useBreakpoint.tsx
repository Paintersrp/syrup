import React, { useState, useEffect } from 'react';
import { Breakpoint, breakpoints } from '../theme/common';

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [isAtBreakpoint, setIsAtBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsAtBreakpoint(window.innerWidth <= breakpoints[breakpoint]);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isAtBreakpoint;
};
