//to retrieve all comments
//add new commnt
// delete comment

const comments = [
    {
        author: "John Doe",
        text: "This blog is great!"
    },
    {
        author: "Jane Doe",
        text: "I agree!"
    }
];

// Fetch comments
export const fetchComments = () => {
    return comments;
};

// Add a comment
export const addComment = (comment) => {
    comments.push(comment);
};

// Delete a comment by index
export const deleteComment = (index) => {
    if (index > -1 && index < comments.length) {
        comments.splice(index, 1);
    }
};