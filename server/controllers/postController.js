const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = new Post({
      title,
      body,
      author: req.userData.userId, // Assuming you're using JWT for authentication
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
