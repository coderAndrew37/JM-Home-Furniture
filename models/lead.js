const mongoose = require("mongoose");
const Joi = require("joi");

// Define Lead Magnet Schema
const leadMagnetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Define Joi validation schema
leadMagnetSchema.statics.validateLeadMagnet = function (data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

module.exports = mongoose.model("LeadMagnet", leadMagnetSchema);
