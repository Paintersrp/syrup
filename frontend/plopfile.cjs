const componentGenerator = require("./generators/index.cjs");

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = function (plop) {
  plop.setGenerator("component", componentGenerator);
};
