# scale-fs

A module extending the standard node.js fs module to
add enahnced capabilities to improve efficiency and scalability.
 
Currently, the effected method is fs.readFile(), which is 
overloaded to provide temporary caching of requets and responses
of file read operations. This means that whether 1 or 1,000,000 
requests are made for the same file, the file will only actually 
be read from disk once, potentially dramatically reducing disk
I/O load. 

(This module is basically combining the batch and cache patterns
found in https://github.com/nodebits/distilled-patterns in an 
easy to use package)

## Usage

Using scale-fs is really easy. Just install scale-fs using npm:

```
npm install scale-fs
```

Then require the scale-fs module instead of the standard fs module:

```javascript
var fs = require('scale-fs');
```

You can then use the fs module object as you would normally. It gives you access to all of the functions present in the standard fs module, and transparently overloads some methods (such as readFile()) to improve efficiency.