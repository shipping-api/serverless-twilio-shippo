const twilio = twilio = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

module.exports.smsUpdates = (event, context, callback) => {
  console.log(event);
  var body = event.body,
      trackingStatus = body.tracking_status,
      trackingLocation = '';

  if (trackingStatus.location) {
    if (trackingStatus.location.city) {
      trackingLocation = trackingStatus.location.city + ', ' |
          trackingStatus.location.state
    }
  } else {
    trackingLocation = 'UNKNOWN';
  };

  const response = {
      statusCode: 200,
      body: JSON.stringify({
        input: event,
      }),
    };

  twilio.sendMessage({
    to: '+1-DESTINATION-NUMBER',
    from: '+1-TWILIO-NUMBER',
    body: 'Tracking #: ' + body.tracking_number +
          '\nStatus: ' + trackingStatus.status +
          '\nLocation: ' + trackingLocation
  })
  .then(function(success) {
    console.log(success);
    callback(null, response);
  })
  .catch(function(error) {
    console.log(error);
    callback(null, response);
  })
};
