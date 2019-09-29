function checkIfArray(node, scope) {
  const v = scope.set.get(node.name) || scope.upper.set.get(node.name);
  return v.defs[v.defs.length - 1].node.init.type === 'ArrayExpression';
}

function changeToNativeArray(node, sourseCode) {
  const arr = sourseCode.getText(node.arguments[0]);
  const callback = sourseCode.getText(node.arguments[1]);
  return `${arr}.map(${callback})`;
}

module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'use native Array.prototype.map() instead of lodash _.map function',
      category: 'ECMAScript 6',
      recommended: true,
      url: '',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    const sourseCode = context.getSourceCode();

    return {
      CallExpression(node) {
        const scope = context.getScope(node);
        if (node.callee.object && node.callee.property && node.callee.object.name === '_' && node.callee.property.name === 'map') {
          const obj = node.arguments[0];
          if ((obj.type === 'ArrayExpression') || (obj.type !== 'ObjectExpression' && checkIfArray(obj, scope))) {
            context.report({
              node,
              message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
              fix(fixer) {
                const nodeText = changeToNativeArray(node, sourseCode);
                return fixer.replaceText(node, nodeText);
              },
            });
          }
        }
      },
    };
  },
};
