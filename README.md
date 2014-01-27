scale-fs - a module extending the standard node.js fs module to
add enahnced capabilities to improve efficiency and scalability.
 
Currently, the effected method is fs.readFile(), which is 
overloaded to provide temporary caching of requets and responses
of file read operations. This means that whether 1 or 1,000,000 
requests are made for the same file, the file will only actually 
be raed from disk once, potentially dramatically reducing disk
I/O load. 

This module is basically combining the batch and cache patterns
found in https://github.com/nodebits/distilled-patterns in an 
easy to use package