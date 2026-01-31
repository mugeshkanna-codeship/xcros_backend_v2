import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const ListingMessage = mongoose.model("messageTo_listing", schema);

export default ListingMessage;
