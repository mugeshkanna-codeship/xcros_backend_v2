import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    reported_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fake: {
      type: Boolean,
    },
    inappropriate: {
      type: Boolean,
    },
    abusive: {
      type: Boolean,
    },
    message: {
      type: String,
    },
    pincode: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const ReportReview = mongoose.model("ReportReview", schema , "reported_review");

export default ReportReview;
