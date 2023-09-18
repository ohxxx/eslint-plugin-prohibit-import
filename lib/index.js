const path = require('path');

const reportError = (context, node, type = 'import') => {
  const options = context.options[0] ?? {};
  const { exclude = [], pkgs = [], fix = true } = options;
  const pkg = type === 'import'
    ? node.source.value
    : node.declarations[0].init.arguments[0].value;
  if (!pkgs.length) return;

  const excludePaths = exclude.map((item) => path.resolve(process.cwd(), item));
  const filePath = context.getFilename();

  if (excludePaths.some((item) => filePath.includes(item))) return;

  if (
    pkgs.some((item) => pkg === item) ||
    pkgs.some((item) => pkg?.startsWith(item) && pkg?.[item.length] === '/')
  ) {
    context.report({
      node,
      message: "Import of the package is prohibited under this file",
      fix: (fixer) => {
        if (!fix) return fixer.insertTextAfter(node, "")

        const startRange = node.range
        const endRange = type === 'import'
          ? node.range
          : node.declarations[0].init.range

        return fixer.removeRange([startRange[0] - 1, endRange[1]])
      }
    });
  }

  return
}

module.exports.rules = {
  "config": {
    meta: {
      fixable: "code",
      schema: [
        {
          type: "object",
          properties: {
            exclude: {
              type: "array",
              items: {
                type: "string"
              }
            },
            pkgs: {
              type: "array",
              items: {
                type: "string"
              }
            },
            fix: {
              type: "boolean"
            }
          },
          additionalProperties: false
        }
      ]
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          reportError(context, node, 'import');
        },
        VariableDeclaration(node) {
          if (node.declarations[0].init.type === 'CallExpression') {
            reportError(context, node, 'require');
          }
        }
      }
    }
  }
}