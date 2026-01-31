import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    color: {
      type: String,
    },
    text_color: {
      type: String,
    },
    image: {
      type: String,
    },
    purpose: {
      type: String,
    },
    url: {
      type: String,
    },
    domain: {
      type: String,
    },
    available: {
      type: String,
    },
  },
  { timestamps: true }
);

const Socials = mongoose.model("Socials", schema);

export default Socials;
