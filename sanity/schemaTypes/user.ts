// /schemas/user.js (or create a cart schema)

export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email',
      },
      {
        name: 'cart', // Cart field for the user
        title: 'Cart',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'productId', type: 'string' },
              { name: 'quantity', type: 'number' },
              { name: 'price', type: 'number' },
              { name: 'name', type: 'string' },
              { name: 'imageUrl', type: 'string' },
            ],
          },
        ],
      },
    ],
  };
  