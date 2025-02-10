import api from "./blogApi"; //mock api
import { useParams } from "react-router-dom";
import Comment from "../comment/Comment";

function BlogDetail() {
    const {id} = useParams(); //get id from url
    const blog = api.getPostById(Number(id)) //get blog post that matches the given id

    if(!blog) return <div>Blog not found</div>

    const comments = [
        {
            author: "John Doe",
            text: "This blog is great!"
        },
        {
            author: "Jane Doe",
            text: "I agree!"
        }
    ]

  return (
    //data fecth kat sini
    <div>
        <h1>{blog.title}</h1>
        <strong>{blog.author}</strong>
        <strong>{blog.date}</strong>
        <p>{blog.content}</p>

        <Comment comments={comments} />
    </div>
  )
}

export default BlogDetail