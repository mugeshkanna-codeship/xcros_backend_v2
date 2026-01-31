import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
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

const Experience = mongoose.model("Experience", schema, "experience");

export default Experience;
