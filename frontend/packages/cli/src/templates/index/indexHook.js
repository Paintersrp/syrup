/**
 * @description
 * Returns the template for generating the individual index file for a hook.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index hook individual template.
 */
export const IndexHookIndividualTemplate = (featureName) =>
  `
export { use${featureName} } from './use${featureName}';
`;
