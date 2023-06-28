import { SyFormatter } from '../utils/SyFormater.js';

/**
 * Returns the template for generating the index suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index suite template.
 */
export const IndexSuiteTemplate = (featureName) =>
  `
export { ${featureName} } from './routes/${featureName}';
export { ${SyFormatter.deplural(featureName)} } from './routes/${SyFormatter.deplural(
    featureName
  )}';
export { ${featureName}Routes } from './routes';
`;
