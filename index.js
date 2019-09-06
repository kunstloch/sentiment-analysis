let responseString;
let response;
let responseArray;
let yourText = 'I like to hit you in the face when you ask me to stop.';
let text;

const inquirer = require('inquirer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Whitch text shoud I analyze? ', answer => {
  // TODO: Log the answer in a database

  var https = require('https');
  const sendText = JSON.stringify({
    text: answer,
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

      console.log(`\nI analyze this text: ` + `"` + answer + `"\n`);
      console.log(
        'Your text is: ' +
          responseArray.sentiment.label +
          '. (I am ' +
          Math.round(responseArray.sentiment.confidence * 100) +
          '% confident.)',
      );
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
  rl.close();
});

var questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Do you want to have another try? (y/n) ',
  },
];

// try too loop

inquirer.prompt(questions).then(answers => {
  if (answers === `y`) {
    sentimentAnalisys;
  } else if ((answers !== `n`) | `y`) {
    console.log(`Sorry that wasn't a correct answer. Try again. `);
  }
});
