import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    placement: {
      type: String,
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    info: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
    Linkedin: {
      type: String,
    },
    Instagram: {
      type: String,
    },
    image: {
      type: String,
    },
    mascot_logo_image: {
      type: String,
    },
    bg_color_1: {
      type: String,
    },
    bg_color_2: {
      type: String,
    },
  },
  { timestamps: true }
);

const Teams = mongoose.model("Teams", schema);

export default Teams;
