const client = require('./index');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');

    await client.query(`

      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;

    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error while dropping tables!');
  }
}

async function createTables() {
  try {
    console.log('Starting to construct tables...');

    await client.query(`

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255)  NOT NULL,
        type VARCHAR(255) DEFAULT 'user' NOT NULL
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT  NOT NULL,
        price MONEY NOT NULL,
        quantity INTEGER DEFAULT 0
      );

      CREATE TABLE images(
        id SERIAL PRIMARY KEY,
        url text UNIQUE NOT NULL,
        "productId" INTEGER REFERENCES products(id)
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER 	REFERENCES users(id),
        UNIQUE ("productId", "userId")
      );

    `);

    console.log('Finished constructing tables!');
  } catch (error) {
    console.error('Error constructing tables!');
  }
}

async function rebuildDatabase() {
  try {
    await dropTables();

    await createTables();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

client
  .connect()
  .then(rebuildDatabase)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  rebuildDatabase,
};
