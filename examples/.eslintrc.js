module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    "prohibit-import"
  ],
  rules: {
    "prohibit-import/rules": ["error", {
      exclude: ['exclude'],
      pkgs: ['lodash'],
      fix: false
    }]
  }
}
