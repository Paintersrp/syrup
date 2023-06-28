import path from 'path';

/**
 * The current directory path.
 */
export const CURRENT_DIR = path.resolve();

/**
 * The path to the components directory.
 */
export const COMPONENTS_DIR = path.join(CURRENT_DIR, 'src', 'components');

/**
 * The path to the components directory.
 */
export const FEATURES_DIR = path.join(CURRENT_DIR, 'src', 'features');

/**
 * The path to the components directory.
 */
export const HOOKS_DIR = path.join(CURRENT_DIR, 'src', 'hooks');

/**
 * The path to the components directory.
 */
export const STORES_DIR = path.join(CURRENT_DIR, 'src', 'stores');

/**
 * Constant of folders that should be generated within the feature folder.
 */
export const FEATURE_SUBDIRS = ['api', 'components', 'routes', 'types'];
