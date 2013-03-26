var play = require('../');
var client = play.create({ token : 'dd2f852e8ca0f9e17b8d1f4c8a5a8848'});

client.topics().all(function(err, result) {
  if (err) {
  } else {
    console.log('Topics : ', result);
    if (result) {
      var name = result[0].name;
      client.topics().get(name, function(err, result) {
        console.log("> Topic ", name);
        console.log(result);
      });
    }
  }
});