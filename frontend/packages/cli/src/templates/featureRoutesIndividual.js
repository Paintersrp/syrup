/**
 * Returns the template for generating the individual index file.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index individual template.
 */
export const FeatureRoutesIndividualTemplate = (featureName) =>
  `
export { ${featureName} } from './${featureName}';
`;
