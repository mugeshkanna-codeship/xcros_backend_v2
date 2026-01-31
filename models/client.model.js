import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    placement: {
      type: String,
    },
    uid: {
      type: String,
    },
    info_title: {
      type: String,
    },
    info_data: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      default:null,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default:null,
    },
    pincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincodes",
      default:null,
    },
    is_active: {
      type: Boolean,
      default: false,
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
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Clients = mongoose.model("Clients", schema, "clients");

export default Clients;
