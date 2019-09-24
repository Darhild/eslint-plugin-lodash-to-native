function changeToNativeArray(node) {
  if (node.arguments[0].type === 'ArrayExpression') {
    const newNode = { ...node };
    newNode.callee.object = node.arguments[0];
    newNode.callee.property.name = 'map';
    newNode.arguments[0] = node.arguments[1];

    return { ...newNode };
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
    return {
      CallExpression(node) {
        if (node.callee.object.name === '_' && node.callee.property.name === 'map') {
          if (node.arguments[0].type !== 'ObjectExpression') {
            context.report({
              node,
              message: 'It\'s recommended to use native ES2015 Array.prototype.map() indtaed of lodash _.map function',
              fix: changeToNativeArray(node),
            });
          }
        }
      },
    };
  },
};