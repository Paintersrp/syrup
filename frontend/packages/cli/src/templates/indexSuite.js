import { SyAlter } from '../utils/SyAlter.js';

/**
 * Returns the template for generating the index suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index suite template.
 */
export const IndexSuiteTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
export { ${SyAlter.deplural(featureName)} } from './routes/${SyAlter.deplural(featureName)}';
export { ${featureName}Routes } from './routes';
`;
