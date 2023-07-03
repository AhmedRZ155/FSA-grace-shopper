const { faker } = require('@faker-js/faker');

const user_list = [
  {
    email: 'user1',
    name: 'user1',
    password: '123',
  },
  {
    email: 'user2',
    name: 'user2',
    password: '123',
  },
  {
    email: 'user3',
    name: 'user3',
    password: '123',
  },
  {
    email: 'user4',
    name: 'user4',
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
