const { faker } = require('@faker-js/faker');

const product_list = [];

const category_list = ['men', 'women', 'kids'];

for (let i = 1; i <= 20; i++) {
  new_product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: category_list[Math.floor(Math.random() * category_list.length)],
    quantity: Math.round(Math.random() * 20),
  };
  product_list.push(new_product);
}

module.exports = {
  product_list,
};
