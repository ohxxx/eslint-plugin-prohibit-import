const path = require('path');

const reportError = (context, node) => {
  const options = context.options[0] ?? {};
  const { exclude = [], pkgs = {}, fix = true } = options;
  const pkg = node.source.value;

  if (!pkgs.length) return;

  const excludePaths = exclude.map((item) => path.resolve(process.cwd(), item));
  const filePath = context.getFilename();

  if (excludePaths.some((item) => filePath.includes(item))) return;

  if (
    pkgs.some((item) => pkg === item) ||
    pkgs.some((item) => pkg.startsWith(item) && pkg[item.length] === '/')
  ) {
    context.report({
      node,
      message: "Import of the package is prohibited under this file",
      fix: (fixer) => {
        if (!fix) return fixer.insertTextAfter(node, "")
        const range = node.range
        return fixer.removeRange([range[0] - 1, range[1]])
      }
    });
  }
}
module.exports.rules = {
  "rules": {
    meta: {
      fixable: "code",
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          reportError(context, node);
        }
      }
    }
  }
}