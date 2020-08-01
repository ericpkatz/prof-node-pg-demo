const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./db');

app.get('/', (req, res)=> {
  res.redirect('/users');
});

app.use('/users', require('./routes'));


const port = process.env.PORT || 3000;



db.setup();

app.listen(port, ()=> console.log(`listening on port ${port}`));
