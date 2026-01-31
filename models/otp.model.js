import mongoose from "mongoose";


const schema = new mongoose.Schema(
  {
    mobile: {
      type: String,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);


const Otp = mongoose.model("Otp", schema);

export default Otp;
