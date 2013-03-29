//
// Publish a message to a resource
//

var play = require('../');
var client = play.create({ token : 'dd2f852e8ca0f9e17b8d1f4c8a5a8848'});

// get a resource I can send messages to...
// default for tests...
var resource = 'http://streams.event-processing.org/ids/activityEvent#stream';
var message = 'This is the message payload';

client.publish(resource, message, function(err, result) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('HTTP Status (200 is OK, 401 is bad):', result.statusCode)
  }
});