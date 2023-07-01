/**
 * Returns the template for generating a page component.
 *
 * @param {string} featureName - The name of the feature.
 * @param {boolean} [unplural=false] - Whether to depluralize the feature name.
 * @returns {string} - The page template.
 */
export const FeaturePageTemplate = (featureName) =>
  `
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { use${featureName} } from '../api/use${featureName}';

export const ${featureName}: FC = () => {
  const { data, isLoading } = use${featureName}();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      Boilerplate
    </Page>
  );
};
`;
