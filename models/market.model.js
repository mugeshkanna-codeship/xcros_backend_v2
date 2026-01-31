import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    url: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Market = mongoose.model("Market", schema);

export default Market;
