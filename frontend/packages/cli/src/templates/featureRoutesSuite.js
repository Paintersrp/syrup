import { SyFormatter } from '../utils/SyFormatter.js';

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
import { ${SyFormatter.deplural(featureName)} } from './${SyFormatter.deplural(featureName)}';

export const ${featureName}Routes = () => {
  return (
    <Routes>
      <Route path="" element={<${featureName} />} />
      <Route path=":id" element={<${SyFormatter.deplural(featureName)} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
`;
