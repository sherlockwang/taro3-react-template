module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'taro/react',
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks', 'import', 'react'], // add to config manually
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    console: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'id-length': [
      1,
      {
        min: 2,
        properties: 'always',
        exceptions: ['i', 'j', 'a', 'b'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
  },
}
