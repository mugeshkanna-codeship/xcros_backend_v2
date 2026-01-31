import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    roleType: {
      type: String,
      enum: ["AGENT", "USER"],
      required: true,
    },
    service: {
      type: String,
      trim: true,
      required: true,
    },
    topic: {
      type: String,
      trim: true,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FaqGeneral = mongoose.model("FaqGeneral", schema);

export default FaqGeneral;