/**
 * @fileoverview use native Array.prototype.map() instead of lodash _.map function
 * @author Darhild
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/map');

const tester = new RuleTester({
  parserOptions: { ecmaVersion: 2018 },
});
tester.run('map', rule, {
  valid: [
    'const a = [1, 2, 3, 4, 5, 6, 7, 8].map(item => item + 2);',
    'const a = [1, 2, 3, 4, 5, 6, 7, 8].map(item => item + 2);',
    'const a = _.map({name: 1, id: 1}, item => item + 2);',
  ],

  invalid: [
    {
      code: 'const a = _.map([1, 2, 3, 4, 5, 6, 7, 8], fn);',
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() indtaed of lodash _.map function',
      }],
    },
  ],
});
