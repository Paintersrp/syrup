import { SyAlter } from '../utils/SyAlter.js';

/**
 * Returns the template for generating a route file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The route template.
 */
export const FeatureRoutesSuiteTemplate = (featureName) =>
  `
import { Navigate, Route, Routes } from 'react-router-dom';

import { ${featureName} } from './${featureName}';
import { ${SyAlter.deplural(featureName)} } from './${SyAlter.deplural(featureName)}';

export const ${featureName}Routes = () => {
  return (
    <Routes>
      <Route path="" element={<${featureName} />} />
      <Route path=":id" element={<${SyAlter.deplural(featureName)} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
`;
