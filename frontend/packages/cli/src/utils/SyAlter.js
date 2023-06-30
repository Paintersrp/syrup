/**
 * Utility class for formatting strings and values.
 */
export class SyAlter {
  /**
   * Capitalizes the first character of a string.
   *
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  static capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Removes the last character from a string.
   *
   * @param {string} str - The string to remove the last character from.
   * @returns {string} - The modified string.
   */
  static deplural(str) {
    return str.slice(0, -1);
  }

  /**
   * Converts a string to camelCase.
   *
   * @param {string} str - The string to convert to camelCase.
   * @returns {string} - The camelCased string.
   */
  static toCamelCase(str) {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
  }

  /**
   * Converts a string to kebab-case.
   *
   * @param {string} str - The string to convert to kebab-case.
   * @returns {string} - The kebab-cased string.
   */
  static toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Converts a string to PascalCase.
   *
   * @param {string} str - The string to convert to PascalCase.
   * @returns {string} - The PascalCased string.
   */
  static toPascalCase(str) {
    return str
      .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (_, char) => char.toUpperCase());
  }
}
