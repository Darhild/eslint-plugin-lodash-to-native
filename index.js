/**
 * @fileoverview &#34;use native Array.prototype.map() instead of lodash _.map function
 * @author Darhild
 */
'use strict';

module.exports = {
    rules: {
        'lodash-to-native/map': require('./lib/rules/map')
    }
}

