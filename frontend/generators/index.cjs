const path = require("path");
const fs = require("fs");

/**
 *
 * @type {import('plop').PlopGenerator}
 */
module.exports = {
  description: "Component Generator",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "component name",
    },
  ],
  actions: () => {
    const componentGeneratePath = "src/features/{{name}}";

    return [
      {
        type: "add",
        path: componentGeneratePath + "/api/index.ts",
        templateFile: "generators/empty.ts.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/components/index.ts",
        templateFile: "generators/empty.ts.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/components/Component.tsx",
        templateFile: "generators/Component.tsx.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/types/index.ts",
        templateFile: "generators/empty.ts.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/routes/index.ts",
        templateFile: "generators/empty.ts.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/routes/{{properCase name}}.tsx",
        templateFile: "generators/Component.tsx.hbs",
      },
      {
        type: "add",
        path: componentGeneratePath + "/index.ts",
        templateFile: "generators/index.ts.hbs",
      },
    ];
  },
};
