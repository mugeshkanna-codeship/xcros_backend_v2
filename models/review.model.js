import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    serviceRating: {
      type: Number,
    },
    productRating: {
      type: Number,
    },
    ambienceRating: {
      type: Number,
    },
    representativeRating: {
      type: Number,
    },
    totalRating: {
      type: Number,
    },
    reviewText: {
      type: String,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      }
    ],
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", schema , "reviews");

export default Review;
