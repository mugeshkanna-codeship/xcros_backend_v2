import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: [Object],
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Agent_review = mongoose.model("Agent_review", schema);

export default Agent_review;
