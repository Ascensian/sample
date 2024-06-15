module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint'], // Ajoutez cette ligne pour charger le plugin
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
