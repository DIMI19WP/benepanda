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
        "global-require": "off",
        "import/no-unresolved": "off",
        "quotes": ["error", "double"],
        "react/prop-types": "off",
        "import/extensions": "off",
        "react/jsx-props-no-spreading": "off"
    },
};
