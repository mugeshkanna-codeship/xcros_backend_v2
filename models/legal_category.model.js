import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // Store primary and secondary as simple strings (no external refs)
    primary: {
      type: String,
      default: null,
    },
    secondary: {
      type: String,
      default: null,
    },
    category: {
      type: String,
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
    sequence: {
      type: Number,
      default: 0, 
    },
    primary_sequence:{
       type: Number,
      default: 0,
    },
       secondary_sequence:{
       type: Number,
      default: 0,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const LegalCategory = mongoose.model("LegalCategory", schema);

export default LegalCategory;
