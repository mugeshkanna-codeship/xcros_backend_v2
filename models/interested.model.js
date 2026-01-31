import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
    // Files attached by the user (URLs from /upload/doc-upload or /upload/singleimg)
    attachments: {
      type: [String],
      default: [],
    },
    // Mirror for admin UI compatibility (some lists read `image`)
    image: {
      type: [String],
      default: [],
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Interested = mongoose.model("Interested", schema);

export default Interested;
