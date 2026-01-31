import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"LegalCategory",
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    type: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Legal = mongoose.model("Legal", schema);

export default Legal;
