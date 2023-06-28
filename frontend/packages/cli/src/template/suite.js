import { deplural } from '../utils/format.js';

/**
 * Returns the template for generating the index suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index suite template.
 */
const IndexSuiteTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
export { ${deplural(featureName)} } from './routes/${deplural(featureName)}';
export { ${featureName}Routes } from './routes';
`;

/**
 * Returns the template for generating a route file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The route template.
 */
const RouteTemplate = (featureName) =>
  `
import { Navigate, Route, Routes } from 'react-router-dom';

import { ${featureName} } from './${featureName}';
import { ${deplural(featureName)} } from './${deplural(featureName)}';

export const ${featureName}Routes = () => {
  return (
    <Routes>
      <Route path="" element={<${featureName} />} />
      <Route path=":id" element={<${deplural(featureName)} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
`;

/**
 * Returns the template for generating the index hook suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index hook suite template.
 */
const IndexHookSuiteTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
export { use${deplural(featureName)} } from './use${deplural(featureName)}';
`;

export { IndexHookSuiteTemplate, IndexSuiteTemplate, RouteTemplate };
