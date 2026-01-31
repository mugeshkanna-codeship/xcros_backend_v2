import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    subscriber_email: {
      type: String,
    },
    subscribed_listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const ListingSub = mongoose.model("ListingSub", schema , "listing_subscribers");

export default ListingSub;
