import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
    category: {
      type: String,
      enum: ["offer", "invited"],
    },
    pincode: {
      type: String,
    },
    // Optional city reference for local subscriptions by city
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },
    bannerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banner",
      default: null,
    },
  },
  { timestamps: true }
);

const pincodeSubscribers = mongoose.model("pincodeSubscribers", schema);

export default pincodeSubscribers;
