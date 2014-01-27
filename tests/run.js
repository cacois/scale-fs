var fs = require('../index'),
assert = require('assert');

fs.setCacheLifetime(2000);

fs.readFile('testfile.txt', function(err, contents) {
    if(err) console.log('Error reading file. ' + err);
    else { 
        assert.equal(contents.toString(), "testfile contents", "Error in contents read from file.");
        console.log('Tests passed!');
    }
});
