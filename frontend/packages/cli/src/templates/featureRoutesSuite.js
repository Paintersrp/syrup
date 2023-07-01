/**
 * Returns the template for generating a route file.
 *
 * @param {string} featureName - The name of the feature.
 * @param {string} singularName - The name of the feature in singular format.
 * @returns {string} - The route template.
 */
export const FeatureRoutesSuiteTemplate = (featureName, singularName) =>
  `
import { Navigate, Route, Routes } from 'react-router-dom';

import { ${featureName} } from './${featureName}';
import { ${singularName} } from './${singularName}';

export const ${featureName}Routes = () => {
  return (
    <Routes>
      <Route path="" element={<${featureName} />} />
      <Route path=":id" element={<${singularName} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
`;
