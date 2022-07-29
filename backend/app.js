const express = require('express');
const cors = require('cors')
const questions = require('./questions.json')

const app = express();

app.use(cors())

app.get('/api/questions', function(req, res) {
  res.send(questions);
});

app.listen(4000);
