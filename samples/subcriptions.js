var play = require('../');
var client = play.create({ token : 'dd2f852e8ca0f9e17b8d1f4c8a5a8848'});

var subscriber = 'http://localhost:3000/subscriber';

client.subscriptions().all(function(err, result) {
  if (err) {
    console.log(err)
    return;
  }
  console.log('Subscriptions for current user : ', result);
  
  // get a topic where I can subcribe...
  
  client.topics().all(function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    
    if (!result) {
      console.log('Can not get any topic to subscribe...');
    }
    
    // get the first stream to subscribe to
    var stream = 'http://streams.event-processing.org/ids/activityEvent#stream';
    //console.log(result[0]);

    var subscription = {
      resource : stream,
      subscriber : subscriber
    }

    client.subscriptions().create(subscription, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Subscription result : ', result);
      }
    });
  });
});