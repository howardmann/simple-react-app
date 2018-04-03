let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// Routes
app.use(require('./routes'));

// Catch and send error messages
app.use(function (err, req, res, next) {
  if (err) {
    res.status(422).json({
      error: err.message
    });
  } else {
    next();
  }
});

// 404
app.use(function (req, res) {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = process.env.PORT || 3000;
// Expose and listen
app.listen(PORT, function () {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;