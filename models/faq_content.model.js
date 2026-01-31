import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    primary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaqPrimary",
      default: null,
    },
    secondary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaqSecondary",
      default: null,
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const FaqContent = mongoose.model("FaqContent", schema);

export default FaqContent;
