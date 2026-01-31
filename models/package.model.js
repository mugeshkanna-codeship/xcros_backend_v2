import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
    features: {
      type: Array,
    },
    monthly: {
      type: Number,
    },
    yearly: {
      type: Number,
    },
    validity: {
      type: Number,
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
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", schema, "packages");

export default Package;
