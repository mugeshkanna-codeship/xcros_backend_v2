import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile_url: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    year_of_membership: {
      type: Number,
    },
    number_of_properties: {
      type: Number,
      default: 0,
    },
    number_of_views: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    follow: [{
      platform: {
        type: String,
        required: true,
      },
      id_url: {
        type: String,
        required: true,
      },
    }],
    number_of_articles: {
      type: Number,
      default: 0,
    },
    designation: {
      type: String,
    },
    latest_blog: {
      type: String, // or ObjectId ref to blog
    },
    license_number: {
      type: String,
      required: true,
    },
    specialties: {
      type: [String], // e.g., ["residential", "commercial"]
    },
    experience_years: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    certifications: {
      type: [String],
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const RealEstateAgent = mongoose.model("Real_estate_agent", schema);

export default RealEstateAgent;