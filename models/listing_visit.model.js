import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    visited_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", schema , "listing_visited");

export default Visit;
