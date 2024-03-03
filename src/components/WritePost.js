import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WritePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/posts/create", formData);
      setSuccessMessage("Post saved successfully!");
      setErrorMessage(""); 
      setFormData({
        title: "",
        body: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error saving post");
    }
  };

  const handleShowAllPosts = () => {
    navigate("/posts");
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 mt-8 text-center text-indigo-700">
        Write Post
      </h2>
      <div className="container flex mx-auto justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Body
            </label>
            <textarea
              name="body"
              id="body"
              value={formData.body}
              onChange={handleChange}
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            Save Post
          </button>
          <button
            type="button" 
            onClick={handleShowAllPosts}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Show All Posts
          </button>
        </form>
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default WritePost;
