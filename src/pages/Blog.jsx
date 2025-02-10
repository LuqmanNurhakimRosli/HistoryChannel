import { Link } from "react-router-dom";
import api from "../blog/blogApi"; //mock api

function Blog() {

  const blog = api.getPosts(); //get all blog posts\

  if(!blog) return <div>Loading...</div>;

  return (
    <section className="blog">
      <div>
        <h1>Blog Posts</h1>
        <div>
        <ul>
          {blog.map((blog) => (
            <li key={blog.id}>
            
                <Link to={`/blog/${blog.id}`}>
                 <div>
                  <h2>{blog.title}</h2>
                  <strong>{blog.author}</strong>
                  <strong>{blog.date}</strong>
                 </div>
                </Link>
  
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

export default Blog;