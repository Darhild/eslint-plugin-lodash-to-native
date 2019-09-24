module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "use native Array.prototype.map() instead of lodash _.map function",
            category: "ECMAScript 6",
            recommended: true,
            url: ""
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        return {
            // callback functions
        };
    }
};