import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
    image: {
      type: String,
    },
    textcolor: {
      type: String,
    },
    ref_url: {
      type: String,
    },
    placement: {
      type: String,
    },
    slug: {
      type: String,
    },
    uid: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending Approval",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      default: null,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      default: null,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },
    pincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincodes",
      default: null,
    },
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
    domain: {
      type: String,
    },
    show_in_city: {
      type: Boolean,
      default: false,
    },
    show_in_pincode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Coupons = mongoose.model("Coupons", schema, "coupons");

export default Coupons;
