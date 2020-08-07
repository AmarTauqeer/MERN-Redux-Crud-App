const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CategorySchema = new Schema({
  categoryId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Category = mongoose.model("categories", CategorySchema);
