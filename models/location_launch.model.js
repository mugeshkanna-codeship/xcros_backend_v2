import mongoose from "mongoose";

const sponsorImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    companyName: { type: String, default: "" },
    companyNumber: { type: String, default: "" },
    companyEmail: { type: String, default: "" },
  },
  { _id: false }
);

const sponsorSchema = new mongoose.Schema(
  {
    big: { type: [sponsorImageSchema], default: [] }, 
    small: { type: [sponsorImageSchema], default: [] }, 
  },
  { _id: false }
);

const offerImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    companyName: { type: String, default: "" },
    companyNumber: { type: String, default: "" },
    companyEmail: { type: String, default: "" },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    domain: { type: String },
    // Targeting
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", default: null },
    pincode: { type: mongoose.Schema.Types.ObjectId, ref: "Pincodes", default: null },
    // Up to 3 slider images
    slider_images: { type: [String], default: [] },
    // Launch date (YYYY-MM-DD) and time (HH:mm or free text)
    launch_date: { type: String },
    launch_time: { type: String },
    // Offer images with company details (variable length)
    offer_images: { type: [offerImageSchema], default: [] },
    // Sponsors section with two big and three small images with company details
    sponsors: { type: sponsorSchema, default: () => ({}) },
    // Popup image shown on the location launch page (single image now)
    popup_image: { type: String, default: null },
    popup_image_companyName: { type: String, default: "" },
    popup_image_companyNumber: { type: String, default: "" },
    popup_image_companyEmail: { type: String, default: "" },
    // Visibility control: only visible on frontend once launched === true
    launched: { type: Boolean, default: false },
    // View counter: increments each time the location launch page is visited
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Simple validation hooks
schema.pre("save", function (next) {
  if (this.slider_images && this.slider_images.length > 3) {
    return next(new Error("slider_images can contain max 3 items"));
  }
  if (this.sponsors) {
    if (this.sponsors.big && this.sponsors.big.length > 2) {
      return next(new Error("sponsors.big can contain max 2 items"));
    }
    if (this.sponsors.small && this.sponsors.small.length > 3) {
      return next(new Error("sponsors.small can contain max 3 items"));
    }
  }
  // Require at least one target: city or pincode
  if (!this.city && !this.pincode) {
    return next(new Error("Either city or pincode must be provided"));
  }
  next();
});

const LocationLaunch = mongoose.model("LocationLaunch", schema);

export default LocationLaunch;
