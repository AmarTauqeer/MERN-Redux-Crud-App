const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProductSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Product = mongoose.model("products", ProductSchema);
