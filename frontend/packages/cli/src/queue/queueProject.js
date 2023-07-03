import path from 'path';

import {
  LibraryAxiosTemplate,
  LibraryQueryTemplate,
  ProviderAppTemplate,
  ProviderIndexTemplate,
  ProviderLayoutTemplate,
  RoutesAdminTemplate,
  RoutesAppTemplate,
  RoutesProtectedTemplate,
  RoutesPublicTemplate,
  ThemeAnimationsTemplate,
  ThemeBaseTemplate,
  ThemeBreakpointsTemplate,
  ThemeColorsTemplate,
  ThemeIndexTemplate,
  ThemeInjectFnTemplate,
  ThemeShadowsTemplate,
  ThemeTypesIndexTemplate,
  UtilsFormatTemplate,
  UtilsLazyImportTemplate,
  UtilsScrollToTopTemplate,
} from '../templates/index.js';

/**
 * @description
 * Queues the initialization of library files.
 *
 * @param {string} libDir - The directory for the library files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueInitLib(libDir, generator) {
  generator.addFileToQueue(
    LibraryAxiosTemplate(),
    path.join(libDir, 'axios.ts'),
    'Axios Instance File'
  );

  generator.addFileToQueue(
    LibraryQueryTemplate(),
    path.join(libDir, 'query.ts'),
    'Query Config File'
  );
}

/**
 * @description
 * Queues the initialization of provider files.
 *
 * @param {string} providersDir - The directory for the provider files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueInitProviders(providersDir, generator) {
  generator.addFileToQueue(
    ProviderAppTemplate(),
    path.join(providersDir, 'AppProvider.tsx'),
    'App Provider File'
  );

  generator.addFileToQueue(
    ProviderLayoutTemplate(),
    path.join(providersDir, 'LayoutProvider.tsx'),
    'Layout Provider File'
  );

  generator.addFileToQueue(
    ProviderIndexTemplate(),
    path.join(providersDir, 'index.ts'),
    'Provider Index File'
  );
}

/**
 * @description
 * Queues the initialization of route files.
 *
 * @param {string} routesDir - The directory for the route files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueInitRoutes(routesDir, generator) {
  generator.addFileToQueue(
    RoutesAdminTemplate(),
    path.join(routesDir, 'admin.tsx'),
    'Admin Routes File'
  );

  generator.addFileToQueue(RoutesAppTemplate(), path.join(routesDir, 'app.tsx'), 'App Routes File');

  generator.addFileToQueue(
    RoutesProtectedTemplate(),
    path.join(routesDir, 'protected.tsx'),
    'Protected Routes File'
  );

  generator.addFileToQueue(
    RoutesPublicTemplate(),
    path.join(routesDir, 'public.tsx'),
    'Public Routes File'
  );
}

/**
 * @description
 * Queues the initialization of theme files.
 *
 * @param {string} themeDir - The directory for the theme files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueInitTheme(themeDir, generator) {
  const [themeCommonDir, themeTypesDir, themeUtilsDir] = await generator.genDirectoriesRecursively(
    ['common', 'types', 'utils'],
    themeDir
  );

  generator.addFileToQueue(
    ThemeAnimationsTemplate(),
    path.join(themeCommonDir, 'animations.ts'),
    'Theme Animations File'
  );

  generator.addFileToQueue(
    ThemeBreakpointsTemplate(),
    path.join(themeCommonDir, 'breakpoints.ts'),
    'Theme Breakpoints File'
  );

  generator.addFileToQueue(
    ThemeColorsTemplate(),
    path.join(themeCommonDir, 'colors.ts'),
    'Theme Colors File'
  );

  generator.addFileToQueue(
    ThemeShadowsTemplate(),
    path.join(themeCommonDir, 'shadows.ts'),
    'Theme Shadows File'
  );

  generator.addFileToQueue(
    ThemeIndexTemplate(),
    path.join(themeCommonDir, 'index.ts'),
    'Theme Index File'
  );

  generator.addFileToQueue(
    ThemeTypesIndexTemplate(),
    path.join(themeTypesDir, 'index.ts'),
    'Theme Type Index File'
  );

  generator.addFileToQueue(
    ThemeInjectFnTemplate(),
    path.join(themeUtilsDir, 'inject.ts'),
    'Theme Inject Function File'
  );

  generator.addFileToQueue(ThemeBaseTemplate(), path.join(themeDir, 'index.ts'), 'Theme Base File');
}

/**
 * @description
 * Queues the initialization of util files.
 *
 * @param {string} providersDir - The directory for the provider files.
 * @param {SyGen} generator - The generator instance.
 * @returns {Promise<void>}
 * @async
 */
export async function queueInitUtils(utilsDir, generator) {
  generator.addFileToQueue(
    UtilsFormatTemplate(),
    path.join(utilsDir, 'format.ts'),
    'Format Util File'
  );
  generator.addFileToQueue(
    UtilsLazyImportTemplate(),
    path.join(utilsDir, 'lazyImport.tsx'),
    'Lazy Import Util File'
  );
  generator.addFileToQueue(
    UtilsScrollToTopTemplate(),
    path.join(utilsDir, 'scrollToTop.tsx'),
    'Scroll To Top Util File'
  );
}
