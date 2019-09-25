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
    'const a = _.map({name: 1, id: 1}, item => item + 2);',
    `const a = () => { let collection = { item: 1, num: 1 };
      return _.map(collection, item => item + 2); 
    }`,
    `const a = () => { let collection = 888;
      return _.map(collection, item => item + 2); 
    }`,
    `const collection = { item: 1, num: 1 };
    const a = () => _.map(collection, item => item + 2);`,
  ],

  invalid: [
    {
      code: 'const a = _.map([1, 2, 3, 4, 5, 6, 7, 8], fn);',
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
      }],
      output: 'const a = [1, 2, 3, 4, 5, 6, 7, 8].map(fn);',
    },
    {
      code: 'const a = () => _.map([1, 2, 3], item => item + 2);',
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
      }],
      output: 'const a = () => [1, 2, 3].map(item => item + 2);',
    },
    {
      code:
        `const a = () => { let collection = [1, 2, 3, 4];
          return _.map(collection, item => item + 2);
        }`,
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
      }],
      // eslint-disable-next-line no-trailing-spaces
      output: 
        `const a = () => { let collection = [1, 2, 3, 4];
          return collection.map(item => item + 2);
        }`,
    },    
    {
      code:
        `let collection = [1, 2, 3, 4];
        const a = () => _.map(collection, item => item + 2);`,
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
      }],
      // eslint-disable-next-line no-trailing-spaces
      output: 
        `let collection = [1, 2, 3, 4];
        const a = () => collection.map(item => item + 2);`,
    },
    /*
    {
      code:
        `function addNum(arr) {
          return arr.map(num => num + 1);
        };
        let arr = [1, 2, 3];
        let collection = addNum(arr);
        const t = _.map(collection, item => item + 2);`,
      errors: [{
        message: 'It\'s recommended to use native ES2015 Array.prototype.map() instead of lodash _.map function',
      }],
      // eslint-disable-next-line no-trailing-spaces
      output:
        `function addNum(arr) {
          return arr.map(num => num + 1);
        };
        let arr = [1, 2, 3];
        let collection = addNum(arr);
        const t = collection.map(item => item + 2);`,
    },
    */
  ],
});
