const express = require('express');
const app = express.Router();

module.exports = app;

const db = require('./db');

app.get('/', async(req, res, next)=> {
  try {
    const response = await db.client.query('SELECT * from users');
    const users = response.rows;
    res.send(`
      <h1>Users</h1>
      <a href='/users/add'>+</a>
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

app.post('/', async(req, res, next)=> {
  try{
    const response = await db.client.query(`
      INSERT INTO users(name) values($1) RETURNING *;
    `, [ req.body.name]);

    res.redirect(`/users/${response.rows[0].id}`);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/add', (req, res, next)=> {
  res.send(`
    <form action='/users' method='POST'>
      <input name='name' />
      <button>Save</button>

    </form>
  `);
});


app.get('/:id', async(req, res, next)=> {
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

