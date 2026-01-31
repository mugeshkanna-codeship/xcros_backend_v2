import mongoose from "mongoose";

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
    price: {
      type: Number,
      required: true,
    },
    packageType: {
      type: String,
      required: true,
    },
    featuredPoints: [String],
    description: {
      type: String,
    },
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

const PricingPackage = mongoose.model("PricingPackage", schema);

export default PricingPackage;