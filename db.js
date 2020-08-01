const { Client } = require('pg');
//const Client = pg.Client;
//const { Client } = pg;

const client = new Client('postgres://localhost/my_special_db');

client.connect();


const setup = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );
    INSERT INTO users(name) values('moe');
    INSERT INTO users(name) values('lucy');
    INSERT INTO users(name) values('stanley');
  `;
  await client.query(SQL);
};

module.exports = {
  setup,
  client
};
