import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["AGENT", "USER"],
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const FaqPrimary = mongoose.model("FaqPrimary", schema);

export default FaqPrimary;
