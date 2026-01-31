import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent_review",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate likes per user per review
schema.index({ review_id: 1, user_id: 1 }, { unique: true });

const AgentReviewLike = mongoose.model("Agent_review_like", schema);

export default AgentReviewLike;