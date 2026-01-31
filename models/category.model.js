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
    uid: {
      type: String,
    },
    icon: {
      type: String,
    },
    tags: {
      type: [ mongoose.Schema.Types.ObjectId ],
      ref:"Tag"
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", schema , "category");

export default Category;