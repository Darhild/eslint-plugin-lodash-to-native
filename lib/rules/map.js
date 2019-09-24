function changeToNativeArray(node, sourseCode) {
  if (node.arguments[0].type === 'ArrayExpression') {
    const arr = sourseCode.getText(node.arguments[0]);
    const callback = sourseCode.getText(node.arguments[1]);
    return `${arr}.map(${callback})`;
  }
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
    let scope;

    function checkIfArray(node) {
      const arr = scope.variables.find((variable) => variable.name === node.name);
      return arr.defs[arr.defs.length - 1].type === 'ArrayExpression';
    }

    return {
      CallExpression(node) {
        scope = context.getScope();
        console.log(scope);
        if (node.callee.object.name === '_' && node.callee.property.name === 'map') {
          const obj = node.arguments[0];
          if ((obj.type === 'ArrayExpression') || (obj.type !== 'ObjectExpression' && checkIfArray(obj))) {
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
