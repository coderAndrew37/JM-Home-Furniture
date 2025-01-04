const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for comments
const blogCommentSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

// Joi validation for comment data
const validateBlogComment = (data) => {
  const schema = Joi.object({
    blogId: Joi.string().required(),
    user: Joi.string().min(3).max(50).required(),
    comment: Joi.string().min(5).max(500).required(),
  });
  return schema.validate(data);
};

module.exports = { BlogComment, validateBlogComment };
