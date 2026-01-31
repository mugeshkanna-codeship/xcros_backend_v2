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
    description: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Amentiies = mongoose.model("Amentiies", schema, "amenities");

export default Amentiies;
