const bayes = require('bayes')
const sw = require('stopword');

const data = require('./result.json');

const classifier = bayes.fromJson(JSON.stringify(data));

console.log(classifier.categorize('You have the chance!'));
