import { deplural } from '../utils/format.js';

/**
 * Returns the template for generating a basic component.
 *
 * @param {string} componentName - The name of the component.
 * @returns {string} - The component basic template.
 */
const ComponentBasicTemplate = (componentName) =>
  `
import { FC } from 'react';

import { BaseProps } from '@/theme/base';

interface Props extends BaseProps {}

export const ${componentName}: FC<Props> = ({ ...rest }) => {
  return (

  );
};
`;

/**
 * Returns the template for generating a hook.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The hook template.
 */
const HookTemplate = (featureName) =>
  `
import { useQuery } from 'react-query';

import { axios, ExtractFnReturnType, QueryConfig } from '@/lib/api';

import { ${featureName}Content } from '../types';

export const get${featureName} = async (): Promise<${featureName}Content> => {
  const response = await axios.get<${featureName}Content>("endpoint");
  return response.data;
};

type QueryFnType = typeof get${featureName};

type Use${featureName}Options = {
  config?: QueryConfig<QueryFnType>;
};

export const use${featureName} = ({ config }: Use${featureName}Options = {}) => {
  const ${featureName.toLowerCase()}Query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['${featureName.toLowerCase()}'],
    queryFn: () => get${featureName}(),
  });

  return ${featureName.toLowerCase()}Query;
};
`;

/**
 * Returns the template for generating types for a feature.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The index types template.
 */
const IndexTypesTemplate = (featureName) =>
  `
export type ${featureName}Content = {
  property1: any;
  property2: any;
};
`;

/**
 * Returns the template for generating a page component.
 *
 * @param {string} featureName - The name of the feature.
 * @param {boolean} [unplural=false] - Whether to depluralize the feature name.
 * @returns {string} - The page template.
 */
const PageTemplate = (featureName, unplural = false) =>
  `
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { use${unplural ? deplural(featureName) : featureName} } from '../api/use${
    unplural ? deplural(featureName) : featureName
  }';

export const ${unplural ? deplural(featureName) : featureName}: FC = () => {
  const { data, isLoading } = use${unplural ? deplural(featureName) : featureName}();

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

export { ComponentBasicTemplate, HookTemplate, IndexTypesTemplate, PageTemplate };
