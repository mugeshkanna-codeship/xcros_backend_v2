import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyMobile: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    // Reference to which location launch this is related to
    locationLaunchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationLaunch",
      required: true,
    },
    // City or Pincode - auto-populated from location launch
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
    // Type: sponsor or offer
    type: {
      type: String,
      enum: ["sponsor", "offer"],
      required: true,
    },
  },
  { timestamps: true }
);

const SponsorContact = mongoose.model("SponsorContact", schema);

export default SponsorContact;
