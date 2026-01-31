import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    primary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaqPrimary",
      default: null,
    },
    name: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const FaqSecondary = mongoose.model("FaqSecondary", schema);

export default FaqSecondary;
