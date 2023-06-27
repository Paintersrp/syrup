//*****************************************************************************************/

const IndexBasicTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
`;

//*****************************************************************************************/

const IndexHookIndividualTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
`;

//*****************************************************************************************/

const IndexIndividualTemplate = (featureName) =>
  `
export { ${featureName} } from './${featureName}';
`;

//*****************************************************************************************/

export { IndexBasicTemplate, IndexHookIndividualTemplate, IndexIndividualTemplate };
