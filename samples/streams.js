var play = require('../');
var client = play.create({ token : 'dd2f852e8ca0f9e17b8d1f4c8a5a8848'});

client.streams().all(function(err, result) {
  if (err) {
  } else {
    console.log('Streams : ', result);
  }
});