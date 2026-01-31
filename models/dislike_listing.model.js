import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    liked_listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    liked_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Dislike = mongoose.model("Dislike", schema , "dislike_listing");

export default Dislike;
