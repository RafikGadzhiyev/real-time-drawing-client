import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    "indent": [1, 2],

    "arrow-spacing": "warn",
    "block-spacing": "warn",
    "comma-spacing": "warn",
    "comma-style": "warn",
    "eol-last": "warn",
    "func-call-spacing": "warn",
    "generator-star-spacing": "warn",
    "implicit-arrow-linebreak": "warn",
    "jsx-quotes": "warn",
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "lines-between-class-members": "warn",
    "lines-around-comment": "warn",
    "max-statements-per-line": "warn",
    "multiline-ternary": "warn",
    "no-confusing-arrow": "warn",
    "no-extra-parens": "warn",
    "no-extra-semi": "warn",
    "no-floating-decimal": "warn",
    "no-multi-spaces": "warn",
    "no-multiple-empty-lines": "warn",
    "no-trailing-spaces": "warn",
    "no-whitespace-before-property": "warn",
    "object-curly-spacing": "warn",
    "one-var-declaration-per-line": "warn",
    "quotes": "warn",
    "rest-spread-spacing": "warn",
    "semi": "warn",
    "semi-spacing": "warn",
    "semi-style": "warn",
    "space-before-blocks": "warn",
    "space-in-parens": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "spaced-comment": "warn",
    "switch-colon-spacing": "warn",
    "template-tag-spacing": "warn",
    "wrap-regex": "warn",
    "yield-star-spacing": "warn",

    "new-parens": "error",

    // "array-bracket-spacing": ["warn", "always"],


    "arrow-parens": ["warn", "always"],

    "brace-style": ["warn", "stroustrup"],

    "comma-dangle": ["warn", "always-multiline"],

    "computed-property-spacing": ["warn", "always"],

    "dot-location": ["warn", "property"],

    "function-call-argument-newline": ["warn", "consistent"],

    "operator-linebreak": ["warn", "before"],

    "padded-blocks": ["warn", "never"],

    "quote-props": ["warn", "as-needed"],

    "template-curly-spacing": ["warn", "always"],

    "wrap-iife": ["warn", "inside"],

    // "array-element-newline": ["off", { "minItems": 2 }],

    // "array-bracket-newline": ["warn", { "minItems": 2 }],

    "max-len": ["warn", { "code": 100, "ignoreUrls": true }],

    "newline-per-chained-call": ["warn", { "ignoreChainWithDepth": 1 }],

    "object-curly-newline": ["warn", { "multiline": true, "minProperties": 2 }],

    "padding-line-between-statements": [
      "warn",
      {
        "blankLine": "always",
        "prev": ["const", "let", "var"],
        "next": "*"
      },
      {
        "blankLine": "any",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"]
      }
    ],

    "space-before-function-paren": [
      "warn",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ]
  },
})
