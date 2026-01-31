import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    booking_date_label: {
      type: String, // e.g., "27 December 2019"
    },
    listing_item: {
      type: String, // e.g., "Premium Plaza Hotel"
    },
    persons: {
      type: Number, // e.g., 4
    },
    booking_start_date: {
      type: Date,
    },
    booking_end_date: {
      type: Date,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    payment_state: {
      type: String, // e.g., "Paid"
      enum: ["Paid", "Unpaid", "Pending"],
    },
    payment_method: {
      type: String, // e.g., "Paypal"
    },
    description: {
      type: String,
    },
    profile_image: {
      type: String, // image URL or path
    },
    status_tag: {
      type: String, // e.g., "New"
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema, "booking_user_profiles");

export default Booking;
