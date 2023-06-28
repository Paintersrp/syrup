/**
 * Returns the template for generating an application hook.
 *
 * @param {string} hookName - The name of the hook.
 * @returns {string} - The application hook template.
 */
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

export { AppHookTemplate };
