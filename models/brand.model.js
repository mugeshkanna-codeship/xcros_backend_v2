import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", schema, "brands");

export default Brand;