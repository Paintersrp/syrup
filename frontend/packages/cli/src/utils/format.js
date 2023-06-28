/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes the last character from a string.
 *
 * @param {string} str - The string to remove the last character from.
 * @returns {string} - The modified string.
 */
export function deplural(str) {
  return str.slice(0, -1);
}
