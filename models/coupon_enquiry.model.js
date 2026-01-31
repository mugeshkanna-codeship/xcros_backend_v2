import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Coupon_Enquiry = mongoose.model("Coupon-Enquiry", schema);

export default Coupon_Enquiry;
