/**
 * @description
 * Returns the template for generating an index file in the providers directory.
 *
 * @returns {string} - The index template.
 */
export const ProviderIndexTemplate = () =>
  `
export { AppProvider } from './AppProvider';
export { LayoutProvider } from './LayoutProvider';
`;
