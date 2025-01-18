# Products and Category Schema Report

## 1. Introduction

This report outlines the details of the products and category schemas fetched from an external API and subsequently posted to Sanity CMS. The report covers the schema structure, API data mapping, and implementation steps.

## 2. API Data Fetching

### 2.1 API Overview

- **API Endpoint:** [https://hackathon-apis.vercel.app/api/products](https://hackathon-apis.vercel.app/api/products)
- **Purpose:** Fetch product and category data.
- **Response Example:**
  ```json
  [
    {
      "name": "The Poplar suede sofa",
      "description": "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
      "image": "https://cdn.sanity.io/images/ri847jqu/production/9b6a4fc8c65bbb4e5793fb0e1116b510d73dc9e8-630x375.png",
      "_id": "65453ffd-e476-4b6b-a388-7e3de1bb632a",
      "features": [
          "Premium material",
          "Handmade upholster",
          "Quality timeless classic"
      ],
      "dimensions": {
          "width": "110cm",
          "height": "110cm",
          "depth": "50cm"
      },
      "category": {
          "name": "Tableware",
          "slug": "tableware"
      },
      "price": 980,
      "tags": [
          "popular products"
      ]
    }
  ]
  ```

## 3. Sanity CMS Schemas

### 3.1 Product Schema

This schema represents individual products in the Sanity CMS.

#### Schema Definition:

```javascript
export default {
  name: 'product',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Product Images',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 200,
      },
    },
    {
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      title: 'Category',
    },
  ],
};
```

### 3.2 Category Schema

This schema represents the categories of products in the Sanity CMS.

#### Schema Definition:

```javascript
export default {
  name: 'category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
};
```

## 4. Data Mapping and Posting

### 4.1 Data Mapping

The data fetched from the API was mapped to the corresponding fields in the Sanity schemas:

#### Product Data Mapping:

| API Field  | Sanity Field | Description                            |
| ---------- | ------------ | -------------------------------------- |
| `id`       | `_id`        | Unique identifier for the product      |
| `name`     | `name`       | Product name                           |
| `price`    | `price`      | Product price                          |
| `images`   | `images`     | Array of product images                |
| `slug`     | `slug`       | URL-friendly identifier                |
| `category` | `category`   | Reference to the category              |
| `features` | `features`   | Features of the product                |
| `tags`     | `tags`       | Additional tags for filtering products |

#### Category Data Mapping:

| API Field     | Sanity Field  | Description                        |
| ------------- | ------------- | ---------------------------------- |
| `id`          | `_id`         | Unique identifier for the category |
| `name`        | `name`        | Category name                      |
| `description` | `description` | Category description               |

### 4.2 Posting Data to Sanity

The following steps were taken to post the fetched data to Sanity:

1. **Fetching Data:** Data was fetched from the API using an asynchronous function.
2. **Sanity Store Creation:** A store was created, and its “id”, “dataset”, and “token” were passed in the sanity-migration repo provided in the day\_3 hackathon document.
3. **Connecting with Next.js:** The Sanity store was connected with our Next.js app.

## 5. Conclusion

The product and category data fetched from the API have been successfully mapped and posted to Sanity CMS. This ensures a dynamic and scalable data management system for the aesthetic products marketplace.

