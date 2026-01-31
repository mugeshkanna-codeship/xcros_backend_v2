import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
    },
    alt_tag: {
      type: String,
    },
    description: {
      type: String,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    extension: {
      type: String,
    },
    type: {
      type: String,
      enum: ['image', 'audio', 'video', 'document'],
      default: 'image'
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", schema, "media");

export default Media;
