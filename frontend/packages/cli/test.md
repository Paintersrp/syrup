Certainly! Here's an improved version of the section you provided for the CLI command list in your README:

## CLI Command List

Below is a list of commands supported by the CLI tool along with their descriptions and usage examples:

- **Generate an app component file**

  - Command: `syrup gen-comp <componentName>`
  - Aliases: `syrup gen-c <componentName>`, `syrup gc <componentName>`
  - Description: Generates an app component file.
  - Usage example: `syrup gen-comp Button`

- **Generate an app feature folder structure and files**

  - Command: `syrup gen-feat <featureName> --type <Suite or Individual> --count <number>`
  - Aliases: `syrup gen-f <featureName> --type <Suite or Individual> --count <number>`, `syrup gf <featureName> --type <Suite or Individual> --count <number>`
  - Description: Generates an app feature folder structure and files.
  - Usage example: `syrup gen-feat posts --type Suite --count 1`

- **Generate feature components**

  - Command: `syrup gen-feat-comp --name <Feature Name> --count <number>`
  - Aliases: `syrup gen-f-c --name <Feature Name> --count <number>`, `syrup gfc --name <Feature Name> --count <number>`
  - Description: Generates feature components.
  - Usage example: `syrup gen-feat-comp --name services --count 5`

- **Generate an app hook**

  - Command: `syrup gen-hook <hookName>`
  - Aliases: `syrup gen-h <hookName>`, `syrup gh <hookName>`
  - Description: Generates an app hook.
  - Usage example: `syrup gen-hook useBreakpoint`

- **Generate an app store**

  - Command: `syrup gen-store <storeName>`
  - Aliases: `syrup gen-s <storeName>`, `syrup gs <storeName>`
  - Description: Generates an app store.
  - Usage example: `syrup gen-store auth`

- **Display version**

  - Command: `syrup -V` or `syrup --version`
  - Description: Displays the version of the CLI tool.

- **Get a list of commands**

  - Command: `syrup -h [command]`, `syrup help [command]`, `syrup --help [command]`
  - Description: Shows a list of available commands. If a specific command is provided, displays detailed help for that command.
  - Usage example: `syrup -h gen-hook` (specific command help), `syrup help` (full help menu, no command passed), `syrup --help gen-comp` (specific command help)

Feel free to customize and enhance this section further based on your CLI tool's specific features and options.
