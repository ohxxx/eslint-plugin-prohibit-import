<sub><em>ESLint Plugin</em></sub>
<h1 align="center"></h1>

<div align="center">
  <img src="assets/logo.svg" width="150" height="150">
  <h1>ESLint Plugin Prohibit Import</h1>
  <p>An ESLint plugin that detects and fixes prohibited imports to packages within a folder.</p>
</div>

## Install

``` sh
npm install --save-dev eslint-plugin-prohibit-import
```

## Configuration

```js
// Configure in the .eslintrc.js file
module.exports = {
  ...,
  plugins: [
    "prohibit-import"
  ],
  rules: {
    "prohibit-import/config": [
      "error", // Tip Status
      {
        exclude: ['src/utils'], // Folders to be excluded from inspection
        pkgs: ['lodash'], // Name of package to be disabled
        fix: true, // Whether to repair automatically, default true
      }
    ]
  }
}
```
