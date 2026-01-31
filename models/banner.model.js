import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    phone: {
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
    bg_image: {
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
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
    sequence: {
      type: Number,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      default:null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default:null,
    },
    domain: {
      type: String,
    },
    directory_banner_type: {
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

const Banner = mongoose.model("Banner", schema, "banners");

export default Banner;
