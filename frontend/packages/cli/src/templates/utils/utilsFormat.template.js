export const UtilsFormatTemplate = () =>
  `
  /**
   * @description
   * Capitalizes the first character of a string.
   *
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  export function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * @description
   * Removes the last character from a string.
   *
   * @param {string} str - The string to remove the last character from.
   * @returns {string} - The modified string.
   */
  export function deplural(str) {
    return str.slice(0, -1);
  }
  
  /**
   * @description
   * Converts a string to camelCase.
   *
   * @param {string} str - The string to convert to camelCase.
   * @returns {string} - The camelCased string.
   */
  export function toCamelCase(str) {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
  }
  
  /**
   * @description
   * Converts a string to kebab-case.
   *
   * @param {string} str - The string to convert to kebab-case.
   * @returns {string} - The kebab-cased string.
   */
  export function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
  
  /**
   * @description
   * Converts a string to PascalCase.
   *
   * @param {string} str - The string to convert to PascalCase.
   * @returns {string} - The PascalCased string.
   */
  export function toPascalCase(str) {
    return str
      .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (_, char) => char.toUpperCase());
  }
  
`;
