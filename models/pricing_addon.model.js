import mongoose from "mongoose";

const addonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  images: [String],
  logo: {
    type: String,
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addons: [addonSchema],
});

const schema = new mongoose.Schema(
  {
    placement: {
      type: String,
      enum: [
        "Listing Profile",
        "Online store",
        "Hyperlocal Delivery",
        "Influencer marketing",
        "Sales & Marketing",
        "Advertise with us",
        "Be our member",
        "Network agency",
        "Social investor",
        "Delivery partner",
        "Marketing Agent",
        "Influencer",
        "Affiliate"
      ],
      required: true,
    },
    categories: [categorySchema],
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PricingAddon = mongoose.model("PricingAddon", schema);

export default PricingAddon;