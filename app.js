const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const sslRedirect = require('heroku-ssl-redirect');

const bayes = require('bayes');
const data = require('./result.json');
const classifier = bayes.fromJson(JSON.stringify(data));

const PORT = process.env.PORT || 5000;

// Enable SSL Redirect
app.use(sslRedirect());

// Compression Middleware
app.use(compression());

// Helmet Middleware
app.use(helmet());

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const result = classifier.categorize(req.body.message);
  let spam = "";
  let notspam = "";
  if(result === "spam"){
    spam = "This message is considered as spam.";
  } else {
    notspam = "This message is not considered as spam.";
  }

  res.render('index', {
    message: req.body.message,
    spam: spam,
    notspam: notspam
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
