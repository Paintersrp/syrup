import path from 'path';

export const BASE_DIR = path.resolve();

export const API_DIR = path.join(BASE_DIR, 'api');
export const API_AUTH_DIR = path.join(API_DIR, 'auth');

export const WEB_DIR = path.join(BASE_DIR, 'web');
export const SOURCE_DIR = path.join(WEB_DIR, 'src');
export const HOOKS_DIR = path.join(SOURCE_DIR, 'hooks');
export const LIB_DIR = path.join(SOURCE_DIR, 'lib');
export const PROVIDERS_DIR = path.join(SOURCE_DIR, 'providers');
export const ROUTES_DIR = path.join(SOURCE_DIR, 'routes');
export const STORES_DIR = path.join(SOURCE_DIR, 'stores');
export const TYPES_DIR = path.join(SOURCE_DIR, 'types');
export const UTILS_DIR = path.join(SOURCE_DIR, 'utils');

export const COMPONENTS_DIR = path.join(SOURCE_DIR, 'components');
export const COMPONENTS_SUBDIRS = ['Elements', 'Layout', 'Form', 'Containers', 'Animations'];

export const FEATURES_DIR = path.join(SOURCE_DIR, 'features');
export const FEATURE_SUBDIRS = ['api', 'components', 'routes', 'types'];

export const THEME_DIR = path.join(SOURCE_DIR, 'theme');
export const THEME_SUBDIRS = ['common', 'types', 'utils'];

export const PROJECT_DIRS_WITH_INDEX = ['hooks', 'providers', 'theme', 'types', 'utils'];
export const PROJECT_DIRS_WITHOUT_INDEX = ['components', 'features', 'lib', 'routes', 'stores'];
export const PROJECT_DIRS = [...PROJECT_DIRS_WITH_INDEX, ...PROJECT_DIRS_WITHOUT_INDEX];

/**
 * Returns an object containing the paths for different directories in the project.
 * @returns {Object} The paths object.
 */
export function getPaths() {
  const paths = {
    abs: BASE_DIR,
    api: {
      abs: API_DIR,
      auth: API_AUTH_DIR,
    },
    web: {
      abs: WEB_DIR,
      src: {
        abs: SOURCE_DIR,
        components: {
          abs: COMPONENTS_DIR,
        },
        features: FEATURES_DIR,
        hooks: HOOKS_DIR,
        lib: LIB_DIR,
        providers: PROVIDERS_DIR,
        routes: ROUTES_DIR,
        stores: STORES_DIR,
        theme: THEME_DIR,
        types: TYPES_DIR,
        utils: UTILS_DIR,
      },
    },
  };

  COMPONENTS_SUBDIRS.forEach((subdir) => {
    paths.web.src.components[subdir] = path.join(COMPONENTS_DIR, subdir);
  });

  return paths;
}
