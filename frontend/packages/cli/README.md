# Syrup CLI

Syrup CLI is a command-line tool for generating files with boilerplate and managing folder structure for your project. It confirms (loosely) to Bulletproof React structure and best practices. File boilerplate templates can be viewed in the /src/template folder.

Eventually, I'll link or provide boilerplate output in this file.

#

## Installation

To install Syrup CLI, run the following command:

DOESN'T WORK YET

Clone repo to try it out

```bash
npm install -g syrup-cli
```

#

## Usage

```bash
syrup [command] [options]
```

#

## Full Command List

```bash
# Generate an app component file
#
# <componentName>: string to be used for component name
#   Good Examples:  Button,
#                   Popover
#
#   Bad Examples:   btn,
#                   popOver,
syrup gen-comp <componentName>
syrup gen-comp Button

syrup gen-c <componentName>
syrup gen-c Button

syrup gc <componentName>
syrup gc Button

# Generate an app feature folder structure and files
#
# <featureName>: string to be used for feature name
#   Good Examples:  posts,
#   (Suite)         services,
#                   comments,
#
#   Bad Examples:   post,
#                   ServiceFeature,
#                   Comments,
#
#   Good Examples:  post,
#   (Individual)    service,
#                   comment,
#
#   Bad Examples:   posts,
#                   Comment,
#                   service-feature,
#
# --type: Type of Feature to generate (Suite or Individual)
#   Suite: Generates 2 Pages and 2 Hooks
#   Individual: Generates 1 Page and 1 Hook
# --count: Number of components to include when generating, defaults 1
syrup gen-feat <featureName> --type <Suite or Individual> --count <number>
syrup gen-feat posts --type Suite --count 1

syrup gen-f <featureName> --type <Suite or Individual> --count <number>
syrup gen-f posts --type Individual --count 3

syrup gf <featureName> --type <Suite or Individual> --count <number>
syrup gf posts --type Suite --count 8

or pass with no options (i.e => no --type and --count) for prompt input

# Generate feature components
#
# --name: Name of feature to generate components in
# --count: Number of components to generate
syrup gen-feat-comp --name <Feature Name> --count <number>
syrup gen-feat-comp --name services --count 5

syrup gen-f-c --name <Feature Name> --count <number>
syrup gen-f-c --name services --count 3

syrup gfc --name <Feature Name> --count <number>
syrup gfc --name services --count 1

or pass with no options (i.e => no --name and --count) for prompt input

# Generate an app hook
#
# <hookName>: string to be used for hook name
#   Good Examples:  useBreakpoint,
#                   useModal
#
#   Bad Examples:   breakpointHook,
#                   modals
syrup gen-hook <hookName>
syrup gen-hook useBreakpoint

syrup gen-h <hookName>
syrup gen-h useBreakpoint

syrup gh <hookName>
syrup gh useBreakpoint

# Generate an app store
#
# <storeName>: string to be used for hook name
#   Good Examples:  auth,
#                   alert,
#
#   Bad Examples:   Auth,
#                   alertStore,
syrup gen-store <storeName>
syrup gen-store auth

syrup gen-s <storeName>
syrup gen-s auth

syrup gs <storeName>
syrup gs auth

# Display version
syrup -V
syrup --version

# Get a list of commands
# Pass a [command] for more help
syrup -h [command]
syrup help [command]
syrup --help [command]

syrup -h gen-hook (specific command help)
syrup help (full help menu, no command passed)
syrup --help gen-comp (specific command help)
```

#

### Generate App Component Files

Generates a component file with boilerplate as well as a .test and .stories file

#### Input

```bash
syrup gc Button
```

#### Output

```bash
$ syrup gc Button
? Choose a subdirectory for the component: (Use arrow keys)
❯ Category1
  Category2
  Category3

You will be prompted for a subdirectory of src/components
=>
$ syrup gc Button

[INFO] Generated Folders:
[SUCCESS] ✔ C:\***\***\src\components\Category1\Button

[INFO] Generated Files:
[SUCCESS] ✔ Generated Storybook File: Button.stories.tsx
[SUCCESS] ✔ Generated Component File: Button.tsx
[SUCCESS] ✔ Generated Test File: Button.test.tsx
```

#### Boilerplate

##### Component (Component.tsx)

```bash
import { FC } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { GenericMapping } from '@/types';

const Mapping: GenericMapping = {
  key: value,
  key: value
};

const styles = (theme: ExtendedTheme) => ({
  root: (prop: any) =>
    css({
      property: value,
    }),
  container: css({
    property: value,
  })
});

export interface ${componentName}Props extends BaseProps {
  prop?: any;
}

export const ${componentName}: FC<${componentName}Props> = ({ prop, ...rest }) => {
  const css = inject(styles)
  return (
    <Base {...rest}>
      <div>Boilerplate</div>
    </Base>
  );
};
```

##### Storybook File (Component.stories.tsx)

```bash
import { Meta, StoryFn } from '@storybook/react';
import { ${componentName}, ${componentName}Props } from './${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
} as Meta;

const Template: StoryFn<${componentName}Props> = (args) => (
  <${componentName} {...args} />
);

export const Dynamic = Template.bind({});
```

##### Test File (Component.test.tsx)

```bash
import React from 'react';
import { render } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without errors', () => {
    render(<${componentName} />);
    // Add your assertions here
  });
});
```

#

### Generate Feature Files

A suite generates multiple pages and hooks. An individual generates one page and hook.

Suites generated should have a plural feature name, i.e posts not post or services not service

#### Input

```bash
syrup gf posts --type Suite --count 5
or
syrup gf posts (uses prompts for options)
```

#### Output

##### Without Prompts

```bash
$ syrup gf posts --type Suite --count 5

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\features\posts

[INFO] Generated Files:
[SUCCESS] ✔ Generated Feature Index: C:\syrup\web\src\features\posts\index.ts
[SUCCESS] ✔ Generated Types Index: C:\syrup\web\src\features\posts\types\index.ts
[SUCCESS] ✔ Generated Page File #1: C:\syrup\web\src\features\posts\routes\Posts.tsx
[SUCCESS] ✔ Generated Page File #2: C:\syrup\web\src\features\posts\routes\Post.tsx
[SUCCESS] ✔ Generated Route Index: C:\syrup\web\src\features\posts\routes\index.tsx
[SUCCESS] ✔ Generated Hook File #1: C:\syrup\web\src\features\posts\api\usePosts.tsx
[SUCCESS] ✔ Generated Hook File #2: C:\syrup\web\src\features\posts\api\usePost.tsx
[SUCCESS] ✔ Generated API Index: C:\syrup\web\src\features\posts\api\index.ts
[SUCCESS] ✔ Generated Component #1: C:\syrup\web\src\features\posts\components\Posts1.tsx
[SUCCESS] ✔ Generated Component #2: C:\syrup\web\src\features\posts\components\Posts2.tsx
[SUCCESS] ✔ Generated Component #3: C:\syrup\web\src\features\posts\components\Posts3.tsx
[SUCCESS] ✔ Generated Component #4: C:\syrup\web\src\features\posts\components\Posts4.tsx
[SUCCESS] ✔ Generated Component #5: C:\syrup\web\src\features\posts\components\Posts5.tsx
[SUCCESS] ✔ Generated Component Index: C:\syrup\web\src\features\posts\components\index.ts
```

##### With Prompts

```bash
$ syrup gf posts
? What type of feature do you want? (Use arrow keys)
❯ Individual
  Suite
=>
$ syrup gf posts
? What type of feature do you want? Suite
? How many pre-generated components do you want? 5
=>
$ syrup gf posts
? What type of feature do you want? Suite
? How many pre-generated components do you want? 5

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\features\posts

[INFO] Generated Files:
[SUCCESS] ✔ Generated Feature Index: C:\syrup\web\src\features\posts\index.ts
[SUCCESS] ✔ Generated Types Index: C:\syrup\web\src\features\posts\types\index.ts
[SUCCESS] ✔ Generated Page File #1: C:\syrup\web\src\features\posts\routes\Posts.tsx
[SUCCESS] ✔ Generated Page File #2: C:\syrup\web\src\features\posts\routes\Post.tsx
[SUCCESS] ✔ Generated Route Index: C:\syrup\web\src\features\posts\routes\index.tsx
[SUCCESS] ✔ Generated Hook File #1: C:\syrup\web\src\features\posts\api\usePosts.tsx
[SUCCESS] ✔ Generated Hook File #2: C:\syrup\web\src\features\posts\api\usePost.tsx
[SUCCESS] ✔ Generated API Index: C:\syrup\web\src\features\posts\api\index.ts
[SUCCESS] ✔ Generated Component #1: C:\syrup\web\src\features\posts\components\Posts1.tsx
[SUCCESS] ✔ Generated Component #2: C:\syrup\web\src\features\posts\components\Posts2.tsx
[SUCCESS] ✔ Generated Component #3: C:\syrup\web\src\features\posts\components\Posts3.tsx
[SUCCESS] ✔ Generated Component #4: C:\syrup\web\src\features\posts\components\Posts4.tsx
[SUCCESS] ✔ Generated Component #5: C:\syrup\web\src\features\posts\components\Posts5.tsx
[SUCCESS] ✔ Generated Component Index: C:\syrup\web\src\features\posts\components\index.ts
```

#### Boilerplate

##### Page

```bash
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
```

##### Component

```bash
import { FC } from 'react';

import { BaseProps } from '@/theme/base';

interface Props extends BaseProps {}

export const ${componentName}: FC<Props> = ({ ...rest }) => {
  return (

  );
};
```

##### Routes Index File

```bash
import { Navigate, Route, Routes } from 'react-router-dom';

import { ${featureName} } from './${featureName}';
import { ${deplural(featureName)} } from './${deplural(featureName)}';

export const ${featureName}Routes = () => {
  return (
    <Routes>
      <Route path="" element={<${featureName} />} />
      <Route path=":id" element={<${deplural(featureName)} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
```

##### API Hook

```bash
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
```

#

### Generate Feature Component Files

Generates a specified amount of components in the specificed feature.

If using the prompt, syrup will automatically give a list of folders in the features folder.

#### Input

```bash
syrup gfc --name posts --count 5
or
syrup gfc (uses prompts for options)
```

#### Output

##### Without Prompts

```bash
$ syrup gfc --name posts --count 5

[INFO] Folder Used:
[SUCCESS] ✔ C:\syrup\web\src\features\posts\components

[INFO] Generated Files:
[SUCCESS] ✔ Generated Component #1: PostsGen1
[SUCCESS] ✔ Generated Component #2: PostsGen2
[SUCCESS] ✔ Generated Component #3: PostsGen3
[SUCCESS] ✔ Generated Component #4: PostsGen4
[SUCCESS] ✔ Generated Component #5: PostsGen5
[SUCCESS] ✔ Generated Component Index: C:\syrup\web\src\features\posts\components\index.ts
```

##### With Prompts

```bash
$ syrup gfc
? Choose a feature: (Use arrow keys)
❯ jobs
  posts
=>
$ syrup gfc
? Choose a feature: posts
? How many pre-generated components do you want? 5
=>
$ syrup gfc
? Choose a feature: posts
? How many pre-generated components do you want? 5

[INFO] Folder Used:
[SUCCESS] ✔ C:\syrup\web\src\features\posts\components

[INFO] Generated Files:
[SUCCESS] ✔ Generated Component #1: PostsGen1
[SUCCESS] ✔ Generated Component #2: PostsGen2
[SUCCESS] ✔ Generated Component #3: PostsGen3
[SUCCESS] ✔ Generated Component #4: PostsGen4
[SUCCESS] ✔ Generated Component #5: PostsGen5
[SUCCESS] ✔ Generated Component Index: C:\syrup\web\src\features\posts\components\index.ts
```

#### Boilerplate

##### Component

```bash
import { FC } from 'react';

import { BaseProps } from '@/theme/base';

interface Props extends BaseProps {}

export const ${componentName}: FC<Props> = ({ ...rest }) => {
  return (

  );
};
```

#

### Generate App Hook Files

Generate boilerplate hook file.

#### Input

```bash
syrup gh useBreakpoint
```

#### Output

```bash
$ syrup gh useBreakpoint

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\hooks

[INFO] Generated Files:
[SUCCESS] ✔ Generated Hook File: useBreakpoint.tsx
```

#### Boilerplate

```bash
import { useState, useEffect } from 'react';

export const ${hookName} = (prop: any): any => {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    // useEffect Code
  }, []);

  return state;
};
```

#

### Generate App Store Files

Generate store file (zustand).

#### Input

```bash
syrup gs auth
```

#### Output

```bash
$ syrup gs auth

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\stores

[INFO] Generated Files:
[SUCCESS] ✔ Generated Store File: auth.tsx
```

#### Boilerplate

```bash
import { create } from 'zustand';

const initial${storeName}State = {
  property: value,
};

export interface ${storeName}State {
  property: type,
}

export interface ${storeName}Store {
  ${lowercaseName}State: ${storeName}State,
  ${lowercaseName}Fn: (placeholder: any) => void;
}

export const use${storeName}Store = create<${storeName}Store>((set) => ({
    ${lowercaseName}State: initial${storeName}State,

    ${lowercaseName}Fn: (placeholder) => {
      set((state) => ({
        ${lowercaseName}State: {
            ...state.${lowercaseName}State,
            property: value,
        },
      }));
    },
}));
```

#

### Configuration

You can customize certain aspects of Syrup CLI by modifying the configuration file. The configuration file is located at config.js in the root directory.

Please refer to the configuration documentation for details on the available options and how to modify them.

#

## License

This component is released under the [MIT License](https://opensource.org/licenses/MIT).

---
