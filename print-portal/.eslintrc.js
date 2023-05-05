module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript'
    ],

    parserOptions: {
        parser: '@typescript-eslint/parser'
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'indent': ['error', 4],
        'space-before-function-paren': 0,
        'quote-props': 0,
        'semi': 0,
        'camelcase': 0,
        'no-useless-escape': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-reserved-component-names': 0
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
