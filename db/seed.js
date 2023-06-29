const { faker } = require('@faker-js/faker');

const client = require('./index');
const { product_list, user_list } = require('./dummy_data');
const { createImage } = require('./images');
const { createProduct } = require('./products');
const { createReview } = require('./reviews');
const { createUser } = require('./users');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');

    await client.query(`

      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS reviews;
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
        type VARCHAR(255) DEFAULT 'new' NOT NULL,
        category VARCHAR(255) NOT NULL,
        quantity INTEGER DEFAULT 0
      );

      CREATE TABLE images(
        id SERIAL PRIMARY KEY,
        url text UNIQUE NOT NULL,
        "productId" INTEGER REFERENCES products(id)
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        content text UNIQUE NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER 	REFERENCES users(id)
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

async function createInitialProducts(users) {
  const products = await Promise.all(
    product_list.map(product => createProduct(product))
  );

  await Promise.all(
    products.map(product => createImage(product.id, faker.image.url()))
  );

  await Promise.all(
    products.map(product => createImage(product.id, faker.image.url()))
  );

  await Promise.all(
    products.map(product => createImage(product.id, faker.image.url()))
  );

  await Promise.all(
    product_list.map(async product => {
      const productId = product.id;
      const userId = users[Math.floor(Math.random() * users.length)].id;
      const content = faker.lorem.paragraph({ min: 1, max: 3 });
      return await createReview({ content, productId, userId });
    })
  );

  await Promise.all(
    product_list.map(async product => {
      const productId = product.id;
      const userId = users[Math.round(Math.random() * 10)].id;
      const content = faker.lorem.paragraph({ min: 1, max: 3 });
      return await createReview({ content, productId, userId });
    })
  );
}

async function initialData() {
  try {
    console.log('Starting adding data...');

    const users = await Promise.all(user_list.map(user => createUser(user)));

    await createInitialProducts(users);

    console.log('Finished adding data...');
  } catch (error) {
    console.log('Error adding data...');
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
  .then(initialData)
  .catch(console.error)
  .finally(() => client.end());
