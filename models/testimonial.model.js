import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: String,
    },
    company: {
      type: String,
    },
    image: {
      type: String,
    },
    placement: {
      type: String,
    },
    slug: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", schema, "testimonials");

export default Testimonial;
