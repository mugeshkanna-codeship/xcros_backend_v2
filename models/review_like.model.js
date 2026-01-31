import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
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

const ReviewLike = mongoose.model("ReviewLike", schema , "review_like");

export default ReviewLike;
