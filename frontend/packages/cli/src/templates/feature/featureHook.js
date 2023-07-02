/**
 * @description
 * Returns the template for generating a hook.
 *
 * @param {string} featureName - The name of the feature.
 * @returns {string} - The hook template.
 */
export const FeatureHookTemplate = (featureName) =>
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
