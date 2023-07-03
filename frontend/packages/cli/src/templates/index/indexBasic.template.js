/**
 * @description
 * Returns the template for generating the basic index file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index basic template.
 */
export const IndexBasicTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
`;
