import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    listing_id: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Listing",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    primary_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryCategory",
    },
    secondary_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecondaryCategory",
    },
    domain: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    pincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincodes",
    },
    placement: {
      type: String,
    },
    description:{
      type: String,
    },
    show_in_city:{
      type: Boolean,
      default: false
    },
    show_in_pincode:{
      type: Boolean,
      default: false
    },
    from:{
      type: Date,
    },
    to:{
      type: Date,
    },
  },
  { timestamps: true }
);

const Promoted_Listing = mongoose.model("Promoted_Listing", schema);

export default Promoted_Listing;
