/**
 * @fileoverview use native Array.prototype.map() instead of lodash _.map function
 * @author Darhild
 */

module.exports = {
  rules: {
    'lodash-to-native/map': require('./lib/rules/map'),
  },
};
