// @ts-check

import globals from "globals";
import pluginJs from "@eslint/js";
import neostandard from "neostandard";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const flatCompat = new FlatCompat();
export default tseslint.config(
  ...neostandard({ noStyle: true }),
  ...flatCompat.extends("plugin:lodash/canonical"),
  {
    rules: {
      "lodash/chaining": "off", // I like chaining too much
      "lodash/prefer-lodash-method": "off", // probably slower than native methods
      "lodash/path-style": "off", // false positives when using arrays
    },
  },
  pluginPromise.configs["flat/recommended"],
  nodePlugin.configs["flat/recommended-module"],
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.spec.js", "**/*.spec.ts"],
    ...jest.configs["flat/recommended"],
  },
  { languageOptions: { globals: globals.node } },
);
