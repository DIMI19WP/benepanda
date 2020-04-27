module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "ts", "tsx"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-useless-catch": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off"
  },
};
