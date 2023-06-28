
import { useState, useEffect } from 'react';

export const useBreakpoint = (prop: any): any => {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    // useEffect Code
  }, []);

  return state;
};
