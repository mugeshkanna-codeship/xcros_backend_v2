import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", schema);

export default Subscriber;
