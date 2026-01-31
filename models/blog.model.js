import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    body: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    meta_keywords: {
      type: String,
    },

    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    uid: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", schema, "blogs");

export default Blogs;
