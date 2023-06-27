import { deplural } from '../utils/format.js';

//*****************************************************************************************/

const IndexSuiteTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
export { ${deplural(featureName)} } from './routes/${deplural(featureName)}';
export { ${featureName}Routes } from './routes';
`;

//*****************************************************************************************/

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

//*****************************************************************************************/

const IndexHookSuiteTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
export { use${deplural(featureName)} } from './use${deplural(featureName)}';
`;

//*****************************************************************************************/

export { IndexHookSuiteTemplate, IndexSuiteTemplate, RouteTemplate };
