import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const TeamMessage = mongoose.model("TeamMessage", schema);

export default TeamMessage;
