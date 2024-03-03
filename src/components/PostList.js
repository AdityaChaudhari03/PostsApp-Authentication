import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts/posts?page=${page}`);
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      } catch (error) {
        setError("Error fetching posts");
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Post List</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
      {loading && <p className="text-gray-600 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PostList;
