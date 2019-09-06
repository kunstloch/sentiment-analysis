let responseString;
let response;
let responseArray;
let yourText = 'I like to hit you in the face when you ask me to.';
let text;

var https = require('https');
const sendText = JSON.stringify({
  text: yourText,
});

var options = {
  host: 'apidemo.theysay.io',
  path: '/api/v1/sentiment',
  method: 'POST',

  headers: {
    Referer: 'https://apidemo.theysay.io/',
    'Content-Type': 'application/json',
  },
};

var req = https.request(options, function(res) {
  responseString = '';

  res.on('data', function(data) {
    responseString += data;
    // save all the data from response
  });
  res.on('end', function() {
    // console.log(responseString);
    // print to console when response ends

    response = responseString;

    // transform string to object using JSON.parse
    // console.log(typeof response);
    responseArray = JSON.parse(response);

    // console.log(responseArray);
    // console.log(typeof responseArray);
    // console.log(responseArray.sentiment.label);

    console.log(`\nI analyze this text: ` + `"` + yourText + `"\n`);
    console.log('Your text is: ' + responseArray.sentiment.label + '.');
    if (responseArray.sentiment.label === 'POSITIVE') {
      console.log(`Congratulations! I like your positive attitude!`);
    } else if (responseArray.sentiment.label === 'NEGATIVE') {
      console.log(`Perhaps you should change your text to be more positive.`);
    }

    console.log(
      '\nI am ' +
        Math.round(responseArray.sentiment.confidence * 100) +
        '% confident.',
    );
  });
});

req.write(sendText);
req.end();
