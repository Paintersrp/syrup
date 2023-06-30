import { SyAlter } from '../utils/SyAlter.js';

/**
 * Returns the template for generating the index hook suite file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index hook suite template.
 */
const IndexHookSuiteTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
export { use${SyAlter.deplural(featureName)} } from './use${SyAlter.deplural(featureName)}';
`;

export { IndexHookSuiteTemplate };
