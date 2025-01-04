const express = require("express");
const router = express.Router();
const { BlogComment, validateBlogComment } = require("../models/blogComment");

// POST route to add a new comment
router.post("/add", async (req, res) => {
  const { error } = validateBlogComment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newComment = new BlogComment({
      blogId: req.body.blogId,
      user: req.body.user,
      comment: req.body.comment,
    });
    await newComment.save();

    res.status(201).json({ message: "Comment added successfully!" });
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ message: "Failed to save the comment." });
  }
});

// GET route to fetch comments for a specific blog
router.get("/:blogId", async (req, res) => {
  try {
    const comments = await BlogComment.find({ blogId: req.params.blogId }).sort(
      {
        createdAt: -1,
      }
    );
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Failed to retrieve comments." });
  }
});

module.exports = router;
