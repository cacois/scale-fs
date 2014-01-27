/**
 * scale-fs - a module extending the standard node.js fs module to
 * add enahnced capabilities to improve efficiency and scalability.
 * 
 * Currently, the effected method is fs.readFile(), which is 
 * overloaded to provide temporary caching of requets and responses
 * of file read operations. This means that whether 1 or 1,000,000 
 * requests are made for the same file, the file will only actually 
 * be raed from disk once, potentially dramatically reducing disk
 * I/O load. 
 *
 * This pattern is based on combining the batch and cache patterns
 * found in: https://github.com/nodebits/distilled-patterns
 */

var fs = require('fs');

// Mirror fs module functionality
Object.keys(fs).forEach(function(key) {
    module.exports[key] = fs[key];
});

// Add some extra stuff
module.exports.cacheLifetime = 1000;

module.exports.setCacheLifetime = function(lifetime) {
  module.exports.cacheLifetime = 1000;
}

// Overwrite methods we want to enhance
module.exports.readFile = function(filename, callback) { 
  pReadFile(filename, callback); 
}

// Wrapper for both caching and batching of requests
var requestBatches = {}, requestCache = {}, cacheLifetime = 1000;
function pReadFile(filename, callback) {

  // Do we have the resource in cache?
  if (filename in requestCache) {
    var value = requestCache[filename];
    
    // Behave asynchronously by delaying until next tick
    process.nextTick(function () {
      callback(null, value);
    });

    return;
  }
  // Otherwise, is there a batch for this file?
  if (filename in requestBatches) {
    requestBatches[filename].push(callback);
    return;
  }

  // If neither, create new batch and request
  var callbacks = requestBatches[filename] = [callback];
  fs.readFile(filename, onRead);

  // Cache the result if no error and flush batch
  function onRead(err, file) {
    if (!err) requestCache[filename] = file;
    delete requestBatches[filename];
    
    for (var i = 0;i < callbacks.length; i++) {
      callbacks[i](err, file);
    }
  }
}