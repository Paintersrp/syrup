/**
 * @description
 * Returns the template for generating the index suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @param {string} singularName - The name of the feature in singular format.
 * @returns {string} - The index suite template.
 */
export const IndexSuiteTemplate = (featureName, singularName) =>
  `
export { ${featureName} } from './routes/${featureName}';
export { ${singularName} } from './routes/${singularName}';
export { ${featureName}Routes } from './routes';
`;
