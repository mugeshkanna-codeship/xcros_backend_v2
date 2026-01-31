import mongoose from "mongoose";

const reviewUserProfileSchema = new mongoose.Schema({
  reviewed_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String },
  images: [{ type: String }],
  date: { type: Date, default: Date.now },
  domain: { type: String, required: true },
});

export default mongoose.model("ReviewUserProfile", reviewUserProfileSchema);
