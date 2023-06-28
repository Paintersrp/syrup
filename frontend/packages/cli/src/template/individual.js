/**
 * Returns the template for generating the basic index file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index basic template.
 */
const IndexBasicTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
`;

/**
 * Returns the template for generating the individual index file for a hook.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index hook individual template.
 */
const IndexHookIndividualTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
`;

/**
 * Returns the template for generating the individual index file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index individual template.
 */
const IndexIndividualTemplate = (featureName) =>
  `
export { ${featureName} } from './${featureName}';
`;

export { IndexBasicTemplate, IndexHookIndividualTemplate, IndexIndividualTemplate };
