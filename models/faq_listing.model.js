import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      default: null,
    },
  },
  { timestamps: true }
);

const Faq_Listing = mongoose.model("Faq_Listing", schema);

export default Faq_Listing;
