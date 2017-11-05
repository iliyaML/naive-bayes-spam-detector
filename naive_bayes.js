const bayes = require('bayes')
const sw = require('stopword');
const fs = require('fs');
const readline = require('readline');

const classifier = bayes({
    tokenizer: function (text) {
      const rgxPunctuation = /[^(a-zA-ZA-Яa-я0-9_)+\s]/g
      const sanitized = text.replace(rgxPunctuation, ' ').toLowerCase();
      return sw.removeStopwords(sanitized.split(/\s+/))
    }
});

const rd = readline.createInterface({
    input: fs.createReadStream('./spam_collection.txt'),
    output: process.stdout
});

let i = 0;

// Listen on every line
rd.on('line', function(line) {
    const space = line.indexOf('\t');
    const category = line.substring(0, space);
    const text = line.substring(space + 1);
    classifier.learn(text, category);
    i++;
});

// Listen on close
rd.on('close', function(){
  console.log(i);

  // serialize the classifier's state as a JSON string.
  var stateJson = classifier.toJson()

  fs.writeFile("./result.json", stateJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
});
