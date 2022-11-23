const path = require('path');

module.exports.rules = {
  "rules": {
    meta: {
      fixable: "code",
    },
    create(context) {
      const reportError = (node) => {
        const options = context.options[0] || {};
        const pkg = node.source.value;
        const exclude = options.exclude || [];
        const pkgs = options.pkgs || [];

        const excludePath = exclude.map((item) => path.resolve(process.cwd(), item));
        const filePath = context.getFilename();

        if (
          excludePath.some((item) => filePath.includes(item)) ||
          !pkgs.length
        ) return;

        if (
          pkgs.some((item) => pkg === item) ||
          pkgs.some((item) => pkg.startsWith(item) && pkg[item.length] === '/')
        ) {
          context.report({
            node,
            message: "Import of the package is prohibited under this file",
            fix: (fixer) => {
              const range = node.range
              return fixer.removeRange([range[0] - 1, range[1]])
            }
          });
        }
      }

      return {
        ImportDeclaration(node) {
          reportError(node);
        }
      }
    }
  }
}