var https = require('https');
const sendText = JSON.stringify({
  text: 'Buy the milk'
});

var options = {
  host: 'apidemo.theysay.io',
  path: '/api/v1/topic',
  method: 'POST',

  headers: {
    Referer: 'https://apidemo.theysay.io/',
    'Content-Type': 'application/json'
  }
};

var req = https.request(options, function(res) {
  var responseString = '';

  res.on('data', function(data) {
    responseString += data;
    // save all the data from response
  });
  res.on('end', function() {
    console.log(responseString);
    // print to console when response ends
  });
});

req.write(sendText);
req.end();
