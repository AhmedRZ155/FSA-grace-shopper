const { faker } = require('@faker-js/faker');

const user_list = [
  {
    email: 'brian',
    name: 'brian',
    password: '123',
  },
  {
    email: 'bryson',
    name: 'bryson',
    password: '123',
  },
  {
    email: 'ahmed',
    name: 'ahmed',
    password: '123',
  },
  {
    email: 'bo',
    name: 'bo',
    password: '123',
  },
];

const product_list = [];

const category_list = ['men', 'women', 'kids'];

const type_list = ['trending', 'new', 'on sale'];

for (let i = 1; i <= 40; i++) {
  new_product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    type: type_list[Math.floor(Math.random() * type_list.length)],
    category: category_list[Math.floor(Math.random() * category_list.length)],
    quantity: Math.round(Math.random() * 20),
  };
  product_list.push(new_product);
}

module.exports = {
  product_list,
  user_list,
};
