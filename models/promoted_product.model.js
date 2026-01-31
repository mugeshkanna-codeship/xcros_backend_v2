import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    selling_price: {
      type: Number,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Promoted_Product = mongoose.model("Promoted_Product", schema);

export default Promoted_Product;
