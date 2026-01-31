import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    reported_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
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

const ReportListing = mongoose.model("ReportListing", schema , "reported_listings");

export default ReportListing;
