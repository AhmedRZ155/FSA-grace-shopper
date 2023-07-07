# Grace Shopper API

## Getting Start

1. Fork and clone this repo to your local machine, then run the following commands to reinitialize your git history from scratch:

2. `npm install` to add project dependencies to your local machine.

3. Create PostgreSQL Database name "graceShopper" in your local machine.

4. `npm run seed:dev` will initialize dummy data in you local database.

5. (Optional) `git switch -c "branch_name"` will copy all to new branch.

6. `nodemon` to start server to listen to `.env` PORT or port:1337.

## API Documentation

### Authentication through JSON Web Tokens

```javascript
'Bearer eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9';
```

### Users Endpoints

`POST /users/register`

##### Fetch Options

Body:

- email (string, required)
- name (string, required)
- password (string, required)

```javascript
const registerUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'superman27',
        name: 'batman87',
        password: 'krypt0n0rbust',
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Thanks for signing up for our service",
  "data": {
    "email": "superman27",
    "name": "batman87",
    "type": "user",
    "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
    "cart": [
      {
        "id": 29,
        "quantity": 1,
        "name": "Fantastic Metal Ball",
        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
        "price": "$942.00",
        "type": "new",
        "category": "women",
        "images": [
          {
            "url": "https://loremflickr.com/640/480?lock=4670883673145344"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=3072621446955008"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=1540349547773952"
          }
        ],
        "reviews": [
          {
            "id": 29,
            "content": "A perspiciatis laboriosam voluptas fuga voluptatum hic consectetur similique.",
            "userId": 3,
            "name": "ahmed"
          },
          {
            "id": 69,
            "content": "Sint nam dolore ipsa alias eos accusamus velit praesentium. Tempore quisquam sunt aliquam voluptatibus voluptas pariatur omnis eaque sint.",
            "userId": 4,
            "name": "brian"
          }
        ]
      }
    ]
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`POST /users/login`

##### Fetch Options

Body:

- email (string, required)
- password (string, required)

```javascript
const userLogin = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'superman27',
        password: 'krypt0n0rbust',
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "You're logged in!",
  "data": {
    "email": "superman27",
    "name": "batman87",
    "type": "user",
    "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
    "cart": [
      {
        "id": 29,
        "quantity": 1,
        "name": "Fantastic Metal Ball",
        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
        "price": "$942.00",
        "type": "new",
        "category": "women",
        "images": [
          {
            "url": "https://loremflickr.com/640/480?lock=4670883673145344"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=3072621446955008"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=1540349547773952"
          }
        ],
        "reviews": [
          {
            "id": 29,
            "content": "A perspiciatis laboriosam voluptas fuga voluptatum hic consectetur similique.",
            "userId": 3,
            "name": "ahmed"
          },
          {
            "id": 69,
            "content": "Sint nam dolore ipsa alias eos accusamus velit praesentium. Tempore quisquam sunt aliquam voluptatibus voluptas pariatur omnis eaque sint.",
            "userId": 4,
            "name": "brian"
          }
        ]
      }
    ]
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`GET /users/me`

##### Fetch Options

Headers:

- token (string, required)

```javascript
const userData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success fetch user data",
  "data": {
    "email": "superman27",
    "name": "batman87",
    "type": "user",
    "cart": [
      {
        "id": 29,
        "quantity": 1,
        "name": "Fantastic Metal Ball",
        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
        "price": "$942.00",
        "type": "new",
        "category": "women",
        "images": [
          {
            "url": "https://loremflickr.com/640/480?lock=4670883673145344"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=3072621446955008"
          },
          {
            "url": "https://loremflickr.com/640/480?lock=1540349547773952"
          }
        ],
        "reviews": [
          {
            "id": 29,
            "content": "A perspiciatis laboriosam voluptas fuga voluptatum hic consectetur similique.",
            "userId": 3,
            "name": "ahmed"
          },
          {
            "id": 69,
            "content": "Sint nam dolore ipsa alias eos accusamus velit praesentium. Tempore quisquam sunt aliquam voluptatibus voluptas pariatur omnis eaque sint.",
            "userId": 4,
            "name": "brian"
          }
        ]
      }
    ]
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

### Products Endpoints

`GET /products`

```javascript
const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success fetch products data",
  "data": [
    {
      "id": 1,
      "name": "Intelligent Wooden Bike",
      "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      "price": "$705.00",
      "type": "new",
      "category": "women",
      "quantity": 7,
      "images": [
        {
          "url": "https://loremflickr.com/640/480?lock=2953460450328576"
        },
        {
          "url": "https://picsum.photos/seed/XVilJI/640/480"
        }
      ]
    },
    {
      "id": 2,
      "name": "Awesome Concrete Keyboard",
      "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      "price": "$425.00",
      "type": "new",
      "category": "women",
      "quantity": 7,
      "images": [
        {
          "url": "https://loremflickr.com/640/480?lock=2730744640176128"
        },
        {
          "url": "https://picsum.photos/seed/kYzth1Lxo/640/480"
        }
      ]
    }
  ]
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`POST /products`

Headers:

- token (string, required)

Body:

- name (string, required)
- description (string, required)
- price (string, required)
- category (string, required)
- quantity (number, required)
- images (Array of string or empty array, required)

```javascript
const createProduct = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
      body: JSON.stringify({
        name: 'Intelligent Wooden Bike',
        description:
          'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        price: '705.00',
        category: 'women',
        quantity: 7,
        images: ['https://loremflickr.com/640/480?lock=2953460450328576'],
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success create new product",
  "data": {
    "id": 1,
    "name": "Intelligent Wooden Bike",
    "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    "price": "$705.00",
    "type": "new",
    "category": "women",
    "quantity": 7,
    "images": [
      {
        "url": "https://loremflickr.com/640/480?lock=2953460450328576"
      }
    ]
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`PATCH /products/:productId`

Headers:

- token (string, required)

Body:

- name (string, required)
- description (string, required)
- price (string, required)
- category (string, required)
- quantity (number, required)
- images (Array of string or empty array, required)

```javascript
const updateProduct = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
      body: JSON.stringify({
        name: 'Intelligent Wooden Bike',
        description:
          'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        price: '705.00',
        category: 'women',
        quantity: 7,
        images: ['https://loremflickr.com/640/480?lock=2953460450328576'],
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success update product data",
  "data": {
    "id": 1,
    "name": "Intelligent Wooden Bike",
    "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    "price": "$705.00",
    "type": "new",
    "category": "women",
    "quantity": 7,
    "images": [
      {
        "url": "https://loremflickr.com/640/480?lock=2953460450328576"
      }
    ]
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`DELETE /products/:productId`

Headers:

- token (string, required)

```javascript
const deleteProduct = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success delete product",
  "data": {
    "id": 1,
    "name": "Intelligent Wooden Bike",
    "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    "price": "$705.00",
    "type": "new",
    "category": "women",
    "quantity": 7
  }
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`POST /carts`

Headers:

- token (string, required)

Body:

- productId (number, required)
- quantity (number, required)

```javascript
const addProductToCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
      body: JSON.stringify({
        productId: 29,
        quantity: 1,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success add new product in cart",
  "data": [
    {
      "id": 29,
      "quantity": 1,
      "name": "Fantastic Metal Ball",
      "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      "price": "$942.00",
      "type": "new",
      "category": "women",
      "images": [
        {
          "url": "https://loremflickr.com/640/480?lock=4670883673145344"
        },
        {
          "url": "https://loremflickr.com/640/480?lock=3072621446955008"
        },
        {
          "url": "https://loremflickr.com/640/480?lock=1540349547773952"
        }
      ],
      "reviews": [
        {
          "id": 29,
          "content": "A perspiciatis laboriosam voluptas fuga voluptatum hic consectetur similique.",
          "userId": 3,
          "name": "ahmed"
        },
        {
          "id": 69,
          "content": "Sint nam dolore ipsa alias eos accusamus velit praesentium. Tempore quisquam sunt aliquam voluptatibus voluptas pariatur omnis eaque sint.",
          "userId": 4,
          "name": "brian"
        }
      ]
    }
  ]
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`PATCH /carts`

Headers:

- token (string, required)

Body:

- productId (number, required)
- quantity (number, required)

```javascript
const updateProductInCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
      body: JSON.stringify({
        productId: 29,
        quantity: 2,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success add new product in cart",
  "data": [
    {
      "id": 29,
      "quantity": 2,
      "name": "Fantastic Metal Ball",
      "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      "price": "$942.00",
      "type": "new",
      "category": "women",
      "images": [
        {
          "url": "https://loremflickr.com/640/480?lock=4670883673145344"
        },
        {
          "url": "https://loremflickr.com/640/480?lock=3072621446955008"
        },
        {
          "url": "https://loremflickr.com/640/480?lock=1540349547773952"
        }
      ],
      "reviews": [
        {
          "id": 29,
          "content": "A perspiciatis laboriosam voluptas fuga voluptatum hic consectetur similique.",
          "userId": 3,
          "name": "ahmed"
        },
        {
          "id": 69,
          "content": "Sint nam dolore ipsa alias eos accusamus velit praesentium. Tempore quisquam sunt aliquam voluptatibus voluptas pariatur omnis eaque sint.",
          "userId": 4,
          "name": "brian"
        }
      ]
    }
  ]
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

`DELETE /carts`

Headers:

- token (string, required)

Body:

- productId (number, required)

```javascript
const removeProductFromCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
      body: JSON.stringify({
        productId: 29,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
```

##### Return Data

Success:

```json
{
  "success": true,
  "error": null,
  "message": "Success add new product in cart",
  "data": []
}
```

Fail:

```json
{
  "success": false,
  "error": "ErrorName",
  "message": "Something when wrong",
  "data": null
}
```

## Project Structure

```bash
├── db
│   ├── dummy_data.js
│   ├── images.js
│   ├── index.js
│   ├── products.js
│   ├── reviews.js
│   ├── seed.js
│   └── users.js
│
├── lib
│   └── Logging.js
│
├── routes
│   ├── index.js
│   ├── products.js
│   └── users.js
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```
