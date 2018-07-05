/*
Index file for handler files
*/

var handlers = [
    'routeHandler'
];

handlers.forEach(function(handler) {
    module.exports[handler] = require('./' + handler);
});