/**
 * @description
 * Returns the template for generating the index hook suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @param {string} singularName - The name of the feature in singular format.
 * @returns {string} - The index hook suite template.
 */
const IndexHookSuiteTemplate = (featureName, singularName) =>
  `
export { use${featureName} } from './use${featureName}';
export { use${singularName} } from './use${singularName}';
`;

export { IndexHookSuiteTemplate };
