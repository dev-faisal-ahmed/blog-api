# Blog Post API

A simple Express.js API for creating and retrieving blog posts.

## How to run this project locally

- Fist Clone this project using following command

```bash
git clone https://github.com/dev-faisal-ahmed/blog-api
```

- Open the folder blog-api.

```bash
cd blog-api
```

- Install all the necessary packages

```bash
npm install
```

- Create .env file and add port (eg. 5000)

```bash
PORT=""
```

- Run the project

```bash
npm start
```

## API Documentation

### Create Post

```ts
POST / posts;

// success
body: {
  "title": "Learning RUST",
  "content": "Rust is a really powerful language, And I am planning to learn it",
  "author": "Faisal Ahmed",
  "createdAt": "2025-10-17T17:24:12.469Z"
}

response : {
  "id": 1,
  "title": "Learning RUST",
  "content": "Rust is a really powerful language, And I am planning to learn it",
  "author": "Faisal Ahmed",
  "createdAt": "2025-10-17T17:24:12.469Z"
},

// error
body : {
  "content":"I know exactly how can you do that but, I won't tell ya",
  "author":"Faisal Ahmed"
}

response : {
  "error": "\"title\" is required"
}
```

---

### Get Post By Id

```ts
GET /posts/:id

// success
url : /posts/2

response : {
  "id": 2,
  "title": "How to use your time efficiently",
  "content": "Just try to avoid wasting your time",
  "author": "Morshedul Islam munna",
  "createdAt": "2025-10-17T17:24:55.359Z"
}

// error
url : /posts/5

response : {
  "error": "Blog post with Id 6 not found"
}
```
