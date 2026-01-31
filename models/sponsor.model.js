import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
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
    placement: {
      type: String,
      required: true,
      enum: ["Local Sponsor", "Global Sponsor","Site Landing","Location Guide","Directory"],
    },
    domain: {
      type: String,
    }, 
    title: {
      type: String,
    },
    url_link: {
      type: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
      city:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
      pincode:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pincodes',

      },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor", schema, "sponsors");

export default Sponsor;