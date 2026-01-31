import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    persons: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", schema);

export default Appointment;