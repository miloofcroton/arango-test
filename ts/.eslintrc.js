module.exports = {
	extends: [
    // "react-app",
		"eslint:recommended",
		"plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:mdx/recommended"
	],
	env: {
    node: true,
		es6: true,
		jest: true,
		browser: true,
    // 'cypress/globals': true,
  },
  globals: {
    Cypress: true,
    cy: true,
    assert: true,
  },
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react"
	],
	parserOptions: {
    project: "./tsconfig.eslint.json",
    createDefaultProgram: true, // this is bad, but the VSCode bug is super annoying
		sourceType: "module",
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: "detect"
		}
	},
	rules: {

    // App-specific
    "@typescript-eslint/camelcase": "off",

		// ESLint

		// Replaces the need for Prettier
		// "max-len": ["error", { "code": 300 }],
		"max-len": "off",
		"semi": ["error", "always"],
		"indent": "off",
		"quotes": ["error", "single"],
		"jsx-quotes": ["error", "prefer-double"],
		"comma-dangle": ["error", "only-multiline"],
		"object-curly-spacing": ["error", "always"],
		"array-bracket-spacing": ["error", "never"],
    // "arrow-parens": ["warn", "always"],
    "keyword-spacing": ["warn", {
      "before": true,
      "after": true
    }],

		// ESLint (cont'd)
		"no-case-declarations": "error",
		"no-class-assign": "error",
		"no-cond-assign": "error",
		"no-console": ["warn", { "allow": ["warn", "error", "info"] }],
		"no-constant-condition": "error",
		"no-empty": "error",
		"no-empty-pattern": "warn",
		"no-extra-semi": "off",
		"no-global-assign": "error",
		"no-inner-declarations": "error",
		"no-invalid-regexp": "error",
		"no-mixed-requires": "error",
		"no-mixed-spaces-and-tabs": "error",
		"no-negated-in-lhs": "error",
		"no-new-require": "error",
		"no-path-concat": "error",
		"no-proto": "error",
		"no-regex-spaces": "error",
		"no-restricted-modules": ["error", "sys", "_linklist"],
		"no-sparse-arrays": "error",
		"no-undef": "error",
		"no-unexpected-multiline": "off",
		"no-unsafe-finally": "error",
		"no-unsafe-negation": "error",
		"no-unused-vars": "off", // using typescript plugin instead
		"constructor-super": "error",
		"prefer-const": "error",
		"quote-props": "off",
		"require-yield": "error",
    "linebreak-style": ["error", "unix"],

		// TypeScript-ESLint
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/no-unused-vars": ["warn", { "args": "none" }], // this ignores the unused var error for TS interfaces
		"@typescript-eslint/no-use-before-define": "off",
		// "@typescript-eslint/camelcase": "warn",
		"@typescript-eslint/interface-name-prefix": "off",
    // this rule is documented wrong in eslint's docs, or there's a bug with eslint
    // "@typescript-eslint/array-type": ["error", {
    //   "default": "generic"
    // }],
    "@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/member-delimiter-style": ["error", {
			"multiline": {
        "delimiter": "semi",
        "requireLast": true
			},
			"singleline": {
					"delimiter": "semi",
					"requireLast": true
			}
		}],

		// React
    "react/jsx-closing-bracket-location": "off",
    // "react/jsx-closing-bracket-location": "error",
		"react/jsx-uses-react": "error",
		"react/jsx-key": "error",
		"react/jsx-uses-vars": "error",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "error",
		"react/display-name": "off",
		"react/no-unescaped-entities": "off",
		"react/no-children-prop": "warn"
	}
}
