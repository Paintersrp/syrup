import { deplural } from '../utils/format.js';

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

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

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

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

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

const IndexTypesTemplate = (featureName) =>
  `
export type ${featureName}Content = {
  property1: any;
  property2: any;
};
`;

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

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

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

export { ComponentBasicTemplate, HookTemplate, IndexTypesTemplate, PageTemplate };
