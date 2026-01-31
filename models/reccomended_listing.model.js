import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recommend: {
      type: Boolean,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Recommend = mongoose.model("Recommend", schema , "recommended_listing");

export default Recommend;
