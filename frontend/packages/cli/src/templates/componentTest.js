/**
 * Returns the template for generating component tests.
 *
 * @param {string} componentName - The name of the component.
 * @returns {string} - The component test template.
 */
export const ComponentTestTemplate = (componentName) =>
  `
import React from 'react';
import { render } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without errors', () => {
    render(<${componentName} />);
    // Add your assertions here
  });
});
`;
