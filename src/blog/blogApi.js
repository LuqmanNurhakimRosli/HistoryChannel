// api.jsx
const data = {
  "posts": [
      {
          "id": 1,
          "title": "First Blog Post",
          "content": "To you who see this blog post, I would like to introduce myself. My name is Luqman Nurhakim and CEO of this blog huhu. I would like to say thank you so much for visit this and i feel so happy to you be here. Any message that left I absolutely will happly read! HAHA and thats for now. Thank you again!",
          "author": "CEO",
          "date": "2025-02-10"
      },
      {
          "id": 2,
          "title": "Second Blog Post",
          "content": "This is the content of the second blog post.",
          "author": "CEO",
          "date": "2025-02-10"
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