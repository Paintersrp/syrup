import { SyFormatter } from '../utils/SyFormatter.js';

/**
 * Returns the template for generating the index hook suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index hook suite template.
 */
const IndexHookSuiteTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
export { use${SyFormatter.deplural(featureName)} } from './use${SyFormatter.deplural(featureName)}';
`;

export { IndexHookSuiteTemplate };
