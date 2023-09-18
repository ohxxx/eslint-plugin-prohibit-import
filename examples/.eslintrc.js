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
    "prohibit-import/config": ["error", {
      exclude: ['exclude'],
      pkgs: ['lodash', '@radix-ui'],
      fix: false
    }]
  }
}
