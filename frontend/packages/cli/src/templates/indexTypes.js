/**
 * Returns the template for generating types for a feature.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index types template.
 */
export const IndexTypesTemplate = (featureName) =>
  `
export type ${featureName}Content = {
  property1: any;
  property2: any;
};
`;
