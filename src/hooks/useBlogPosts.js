import { useState, useEffect } from 'react';
import { getPosts } from '../api/blogApi'; 

const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const postsData = await getPosts();
        setPosts(postsData); // Set posts data to state
      } catch (error) {
        console.error('Error fetching posts: ', error);
        setError('Could not load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty array ensures this runs only once when the component mounts

  return { posts, loading, error };
};

export default useBlogPosts;