var fs = require('fs');
var q = require('q');

// Create a wrapper for fs.readFile that returns
// a promise instead of expecting a callback.
var readFile = q.denodeify(fs.readFile);

// Create a first-class object that we can pass around
// to various handlers. All of them will observe the
// resolution of the promise independently and cannot
// affect the representation that other observers get.
var promise = readFile(__filename, 'utf8');
promise.then(console.log, console.error);
