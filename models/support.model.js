import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    // Which form/category submitted this contact
    // Allowed values (by convention): VISITOR | COMPANY | REGISTERED_USER | AGENCY
    category: {
      type: String,
      default: "VISITOR",
      trim: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    // For company/agency contacts
    business_name: {
      type: String,
    },
    business_phone: {
      type: String,
    },
    job_title: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    reason: {
      type: String,
    },
    message: {
      type: String,
    },
    image: {
      type: [String],
      default: [],
    },
    // Alias for clarity on the frontend (kept alongside image for backward compatibility)
    attachments: {
      type: [String],
      default: [],
    },
    // Optional link to a registered user (if logged in)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const SupportContact = mongoose.model("SupportContact", schema);

export default SupportContact;
