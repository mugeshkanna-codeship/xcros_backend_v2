import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type:{
      type:String,
    },
    visibility: {
      type: Boolean,
      default: false,
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
    domain:{
        type:String,
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", schema , "tags");

export default Tag;