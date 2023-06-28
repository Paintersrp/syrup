import { SyFormatter } from '../utils/SyFormater.js';

/**
 * Returns the template for generating a page component.
 *
 * @param {string} featureName - The name of the feature.
 * @param {boolean} [unplural=false] - Whether to depluralize the feature name.
 * @returns {string} - The page template.
 */
export const FeaturePageTemplate = (featureName, unplural = false) =>
  `
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { use${unplural ? SyFormatter.deplural(featureName) : featureName} } from '../api/use${
    unplural ? SyFormatter.deplural(featureName) : featureName
  }';

export const ${unplural ? SyFormatter.deplural(featureName) : featureName}: FC = () => {
  const { data, isLoading } = use${unplural ? SyFormatter.deplural(featureName) : featureName}();

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
