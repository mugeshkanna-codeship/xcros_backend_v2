import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    active: {
      type: String,
    },
    slug: {
      type: String,
    },
    icon: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductCategory = mongoose.model("ProductCategory", schema);

export default ProductCategory;
