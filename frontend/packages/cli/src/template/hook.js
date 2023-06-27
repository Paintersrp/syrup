//*****************************************************************************************/

const AppHookTemplate = (hookName) =>
  `
import { useState, useEffect } from 'react';

export const ${hookName} = (prop: any): any => {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    // useEffect Code
  }, []);

  return state;
};
`;

//*****************************************************************************************/

export { AppHookTemplate };
