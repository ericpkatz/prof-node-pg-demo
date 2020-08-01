const express = require('express');
const app = express();

const db = require('./db');

app.get('/users', async(req, res, next)=> {
  try {
    const response = await db.client.query('SELECT * from users');
    const users = response.rows;
    res.send(`
      <h1>Users</h1>
      <ul>
        ${
          users.map( user => {
            return `<li>
                <a href='/users/${user.id}'>
                  ${ user.name}
                </a>
              </li>`;
          }).join('')
        }
      </ul>
    `);
  }
  catch(ex){
    next(ex);
  }
});


app.get('/users/:id', async(req, res, next)=> {
  try {
    const response = await db.client.query('SELECT * from users WHERE id=$1', [ req.params.id]);
    const user = response.rows[0];
    res.send(`
      <h1><a href='/users'>Users</a></h1>
      <h2>${ user.name }</h2>
    `);
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;



db.setup();

app.listen(port, ()=> console.log(`listening on port ${port}`));
