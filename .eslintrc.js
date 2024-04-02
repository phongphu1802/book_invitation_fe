module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    // "plugin:you-dont-need-lodash-underscore/compatible",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "index", "sibling"], "object"],
        pathGroups: [
          {
            pattern:
              "@{app,constants,services,slices,interfaces,selectors,components,common,hooks,utils,enums,features}/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@{auth,admin,system}/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "import/prefer-default-export": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/no-unstable-nested-components": [
      "error",
      {
        allowAsProps: true,
      },
    ],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*Slice.*"],
      rules: {
        "no-param-reassign": "off",
      },
    },
    {
      files: ["**/Components/Form/**/*"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
  ignorePatterns: ["**/*.d.ts", "**/*.test.*", "node_modules/", "build/", "dist/", "*rc.js", "*config.js"],
};
