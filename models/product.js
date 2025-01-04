const mongoose = require("mongoose");
const Joi = require("joi");

// Rating schema
const ratingSchema = new mongoose.Schema({
  stars: { type: Number, required: true, min: 0, max: 50 },
  count: { type: Number, required: true, min: 0 },
});

// Product schema
const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  rating: { type: ratingSchema, required: true },
  priceCents: { type: Number, required: true, min: 0 },
  type: { type: String, default: "product" }, // 'product' is the default type
  keywords: Array, // Optional, can store product-related keywords
});

// Mongoose model
const Product = mongoose.model("Product", productSchema);

// Joi validation function
function validateProduct(product) {
  const schema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    rating: Joi.object({
      stars: Joi.number().min(0).max(5).required(),
      count: Joi.number().min(0).required(),
    }).required(),
    priceCents: Joi.number().min(0).required(),
    type: Joi.string().valid("product").optional(),
    keywords: Joi.array().items(Joi.string()).optional(),
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validateProduct,
};
