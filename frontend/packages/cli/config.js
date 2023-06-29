import path from 'path';

/**
 * The current directory path.
 */
export const CURRENT_DIR = path.resolve();

/**
 * The path to the source directory.
 */
export const SOURCE_DIR = path.join(CURRENT_DIR, 'src');

/**
 * The path to the components directory.
 */
export const COMPONENTS_DIR = path.join(SOURCE_DIR, 'components');

/**
 * The path to the features directory.
 */
export const FEATURES_DIR = path.join(SOURCE_DIR, 'features');

/**
 * The path to the hooks directory.
 */
export const HOOKS_DIR = path.join(SOURCE_DIR, 'hooks');

/**
 * The path to the stores directory.
 */
export const STORES_DIR = path.join(SOURCE_DIR, 'stores');

/**
 * Constant of folders that should be generated within each feature folder.
 */
export const FEATURE_SUBDIRS = ['api', 'components', 'routes', 'types'];

/**
 * Constant determining whether or not to include generated test files
 */
export const INCLUDE_TESTS = false;

/**
 * Constant determining whether or not to include generated storybook files.
 */
export const INCLUDE_STORIES = true;
