var fs = require('fs');

var play = require('../');
var client = play.create({ token : 'dd2f852e8ca0f9e17b8d1f4c8a5a8848'});

client.patterns().all(function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('Patterns : ', result);
    
    // read the file content
    var data = fs.readFileSync('./patterns/p1.eprq', 'utf-8');
    
    // deploy a new pattern
    client.patterns().create({pattern : data}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('You can get the pattern content at', result.resource_url);
      }
    });
  }
});