// api.jsx
const data = {
  "posts": [
      {
          "id": 1,
          "title": "First Blog Post",
          "content": "This is the content of the first blog post.",
          "author": "Author Name",
          "date": "2025-02-10"
      },
      {
          "id": 2,
          "title": "Second Blog Post",
          "content": "This is the content of the second blog post.",
          "author": "Another Author",
          "date": "2025-02-11"
      }
  ]
};

// Output: Array of all blog posts (with each post having id, title, content, author, date)
const getPosts = () => {
  return data.posts;
};

//This function takes an id as an argument and returns a single blog post that matches the given id.
const getPostById = (id) => {
  return data.posts.find(post => post.id === id);
};

export default { getPosts, getPostById };