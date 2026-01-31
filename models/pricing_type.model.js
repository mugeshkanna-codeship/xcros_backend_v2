import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    dropdowns: [{
      type: String,
    }],
    pricing: {
      type: Number,
      required: true,
    },
    description: [{
      type: String,
    }],
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
    },
  },
  { timestamps: true }
);

const PricingType = mongoose.model("PricingType", schema);

export default PricingType;