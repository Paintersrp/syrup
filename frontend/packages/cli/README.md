# Syrup CLI

Syrup CLI is a command-line tool for generating files with boilerplate and managing folder structure for your project. It confirms (loosely) to Bulletproof React structure and best practices. File boilerplate templates can be viewed in the /src/template folder.

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

## CLI Command List

Below is a list of commands supported by the CLI tool along with their descriptions and usage examples:

---

**Generate directories in Components Directory**

- Command: `syrup gen-dirs <directoryNames...>`
- Description: `Generates a single or multiple app component directories.`
- Aliases:

  - `syrup gen-d <directoryNames...>`
  - `syrup gd <directoryNames...>`

- Usage examples:

  - `syrup gen-dir Elements`
  - `syrup gen-d Elements Form`
  - `syrup gd Elements Form Layout`

---

**Generate A Single or Multiple App Components**

- Command: `syrup gen-comp <componentNames...>`
- Description: `Generates a single or multiple app component files.`
- Aliases:

  - `syrup gen-c <componentNames...>`
  - `syrup gc <componentNames...>`

- Usage examples:

  - `syrup gen-comp Button`
  - `syrup gen-c Button Popover`
  - `syrup gc Button Popover Avatar`

---

**Generate an app feature folder structure and files**

- Command: `syrup gen-feat <featureName> --type <Suite or Individual> --count <number>`
- Description: `Generates an app feature folder structure and files.`
- Aliases:

  - `syrup gen-f <featureName> --type <Suite or Individual> --count <number>`
  - `syrup gf <featureName> --type <Suite or Individual> --count <number>`

- Usage example:

  - `syrup gen-feat posts --type Suite --count 1`
  - `syrup gen-f posts --type Suite --count 1`
  - `syrup gf posts --type Suite --count 1`
  - `syrup gf posts (Provides Prompts)`

---

**Generate feature components**

- Command: `syrup gen-feat-comp --name <Feature Name> --count <number>`
- Description: `Generates feature components.`
- Aliases:

  - `syrup gen-f-c --name <Feature Name> --count <number>`
  - `syrup gfc --name <Feature Name> --count <number>`

- Usage example:

  - `syrup gen-feat-comp --name services --count 5`
  - `syrup gen-f-c --name services --count 5`
  - `syrup gfc --name services --count 5`
  - `syrup gfc (Provides Prompts)`

---

**Generate an app hook**

- Command: `syrup gen-hook <hookName>`
- Description: `Generates an app hook.`
- Aliases:

  - `syrup gen-h <hookName>`
  - `syrup gh <hookName>`

- Usage example:

  - `syrup gen-hook useBreakpoint`
  - `syrup gen-h useBreakpoint`
  - `syrup gh useBreakpoint`

---

**Generate an app store**

- Command: `syrup gen-store <storeName>`
- Description: `Generates an app store.`
- Aliases:

  - `syrup gen-s <storeName>`
  - `syrup gs <storeName>`

- Usage example:

  - `syrup gen-store auth`
  - `syrup gen-s auth`
  - `syrup gs auth`

---

**Display version**

- Command: `syrup -V` or `syrup --version`
- Description: `Displays the version of the CLI tool.`

---

**Get a list of commands**

- Commands:

  - `syrup -h [command]`
  - `syrup help [command]`
  - `syrup --help [command]`

- Description: `Shows a list of available commands. If a specific command is provided, displays detailed help for that command.`

- Usage example:
  - `syrup -h gen-hook (specific command help)`
  - `syrup help (full help menu, no command passed)`
  - `syrup --help gen-comp (specific command help)`

---

## Generate Subdirectories in Components Directory

The `syrup gen-dirs` command allows you to generate a single or multiple directories within the Components directory.

### Input

#

To generate directories, execute the following command:

```bash
syrup gen-dirs <directoryNames...>
```

Replace <directoryNames...> with one or more directory names you want to create. For example:

```bash
syrup gen-dirs Layout Form Elements Buttons
```

### Output

#

Upon running the command, the specified directories will be generated within the Components directory. For example, executing the above command will create the following directory structure:

```bash
components/
  ├── Buttons/
  ├── Elements/
  ├── Form/
  └── Layout/
```

### Boilerplate

#

The gen-dirs command does not generate any specific files or boilerplate code. It simply creates empty directories within the Components directory.

#

## Generate One or Many App Component Files

The "syrup gc" command generates a component file with boilerplate code, along with accompanying .test and .stories files.

### Input

#

To generate a component named "Button", execute the following command:

```bash
syrup gc Button
```

To generate multiple components such as a Button, Popover, and Avatar, execute the following command:

```bash
syrup gc Button Popover Avatar
```

### Output

#

#### Single Component

Upon running the command, you will be prompted to choose a subdirectory for the component. Select one from the provided options. For example:

```bash
$ syrup gc Button
? Choose a subdirectory for the component: (Use arrow keys)
❯ Category1
  Category2
  Category3
```

After selecting a subdirectory, the component files will be generated. Here's an example output:

```bash
[INFO] Generated Folders:
[SUCCESS] ✔ C:\***\***\src\components\Category1\Button

[INFO] Generated Files:
[SUCCESS] ✔ Generated Storybook File: Button.stories.tsx
[SUCCESS] ✔ Generated Component File: Button.tsx
[SUCCESS] ✔ Generated Test File: Button.test.tsx
[INFO] Lines of Code Generated: 61
[INFO] Files Generated: 3
```

#

#### Multiple Components

Upon running the command, you will be prompted to choose a subdirectory for each component. The prompt will be repeated for each component name provided. Select a subdirectory from the options presented.

```bash
$ syrup gen-comps Button Popover Avatar
? Choose a subdirectory for the component Button: (Use arrow keys)
❯ Category1
  Category2
  Category3
? Choose a subdirectory for the component Popover: (Use arrow keys)
❯ Category1
  Category2
  Category3
? Choose a subdirectory for the component Avatar: (Use arrow keys)
❯ Category1
  Category2
  Category3

```

After selecting a subdirectory for each component, the corresponding component files will be generated. The output will indicate the generated folders and files for each component:

```bash
[SUCCESS] Used existing Directory: ✔ C:\Python\syrup\frontend\packages\src\components\Category1\Button
[SUCCESS] ✔ Generated Component File: Button.tsx
[SUCCESS] ✔ Generated Test File: Button.test.tsx
[SUCCESS] ✔ Generated Storybook File: Button.stories.tsx
[SUCCESS] Generated Directory: ✔ C:\Python\syrup\frontend\packages\src\components\Category2\Popover
[SUCCESS] ✔ Generated Component File: Popover.tsx
[SUCCESS] ✔ Generated Storybook File: Popover.stories.tsx
[SUCCESS] ✔ Generated Test File: Popover.test.tsx
[SUCCESS] Generated Directory: ✔ C:\Python\syrup\frontend\packages\src\components\Category3\Avatar
[SUCCESS] ✔ Generated Storybook File: Avatar.stories.tsx
[SUCCESS] ✔ Generated Component File: Avatar.tsx
[SUCCESS] ✔ Generated Test File: Avatar.test.tsx
[INFO] Lines of Code Generated: 183
[INFO] Files Generated: 9
```

### Boilerplate

<a id="boilerplate"></a>

#

#### Component (Component.tsx)

The generated component file contains the following boilerplate code:

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

#### Storybook File (Component.stories.tsx)

The generated component file contains the following boilerplate code:

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

#### Test File (Component.test.tsx)

The generated test file contains the following boilerplate code:

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

## Generate Feature Files

The syrup gf command is used to generate multiple pages and hooks for a feature. You can choose between generating an individual feature or a suite of features. For suites, the feature name should be in plural form, such as "posts" instead of "post" or "services" instead of "service".

### Input

#

You can use the following command with options:

```bash
syrup gf posts --type Suite --count 5
```

- --type <feature-type> (optional): Specifies the type of feature to be generated. Suite generates 2 Page files and 2 Hook files, while Individual generates 1 Page file and 1 Hook file. If not provided, Syrup will prompt you to enter the type.

- --count <component-count> (optional): Specifies the number of pre-generated components to create. If not provided, Syrup will prompt you to enter the count.

Alternatively, you can use prompts for options by running the command without any arguments:

```bash
syrup gf posts
```

### Output

#

##### Without Prompts

Running the command with options will generate the following files and folders:

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
[INFO] Lines of Code Generated: 187
[INFO] Files Generated: 15
```

##### With Prompts

Running the command without any arguments will prompt you for the feature type and the number of pre-generated components. Here's an example:

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
[INFO] Lines of Code Generated: 187
[INFO] Files Generated: 15
```

### Boilerplate

#

#### Page

The generated page files contains the following boilerplate code:

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

#### Component

The generated component files contain the following boilerplate code:

```bash
import { FC } from 'react';

import { BaseProps } from '@/theme/base';

interface Props extends BaseProps {}

export const ${componentName}: FC<Props> = ({ ...rest }) => {
  return (

  );
};
```

#### Routes Index File

The generated routes index file contains the following boilerplate code:

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

#### API Hook

The generated API hook files contain the following boilerplate code:

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

## Generate Feature Component Files

Generates a specified number of components in the specified feature.

If executed without prompts, Syrup will automatically use the list of folders in the features folder.

### Input

#

```bash
syrup gfc --name posts --count 5
```

- --name <feature-name> (optional): Specifies the name of the feature where the components will be generated. If not provided, Syrup will prompt you to choose a feature from the available list.

- --count <component-count> (optional): Specifies the number of pre-generated components to create. If not provided, Syrup will prompt you to enter the count.

Alternatively, you can use prompts for options by running the command without any arguments:

```bash
syrup gfc
```

### Output

#

#### With Prompts

Example Usage with Prompts

```bash
$ syrup gfc --name posts --count 5

[INFO] Folder Used:
[SUCCESS] ✔ C:\syrup\web\src\features\posts\components

[INFO] Generated Files:
[SUCCESS] ✔ Generated Component Basic File: PostsGen1.tsx
[SUCCESS] ✔ Generated Component Basic File: PostsGen2.tsx
[SUCCESS] ✔ Generated Component Basic File: PostsGen3.tsx
[SUCCESS] ✔ Generated Component Basic File: PostsGen4.tsx
[SUCCESS] ✔ Generated Component Basic File: PostsGen5.tsx
[SUCCESS] ✔ Generated Component Index: index.ts
[INFO] Lines of Code Generated: 64
[INFO] Files Generated: 6
```

#### Without Prompts

Example Usage without Prompts

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

### Boilerplate

#

#### Component

The generated component files contain the following boilerplate code:

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

## Generate App Hook Files

Generate boilerplate hook file.

### Input

#

```bash
syrup gh <hookName>
```

- hookName: Specifies the name of the hook file to generate.

### Output

#

Example Usage

```bash
$ syrup gh useBreakpoint

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\hooks

[INFO] Generated Files:
[SUCCESS] ✔ Generated Hook File: useBreakpoint.tsx
[INFO] Lines of Code Generated: 12
[INFO] Files Generated: 1
```

### Boilerplate

#

#### Hook File

The generated hook file contains the following boilerplate code:

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

## Generate App Store Files

Generates a store file using Zustand.

### Input

#

```bash
syrup gs <storeName>
```

- storeName: Specifies the name of the store file to generate.

### Output

#

Example Usage

```bash
$ syrup gs auth

[INFO] Generated Folders:
[SUCCESS] ✔ C:\syrup\web\src\stores

[INFO] Generated Files:
[SUCCESS] ✔ Generated Store File: auth.tsx
[INFO] Lines of Code Generated: 28
[INFO] Files Generated: 1
```

### Boilerplate

#

#### Store File

The generated store file contains the following boilerplate code:

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
