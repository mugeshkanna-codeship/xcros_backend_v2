import mongoose from "mongoose";

const dealOfTheDaySchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      index: true,
    },
    locationType: {
      type: String,
      enum: ["City", "Pincode"],
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: function() {
        return this.locationType === "City";
      },
    },
    pincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincode",
      required: function() {
        return this.locationType === "Pincode";
      },
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
dealOfTheDaySchema.index({ domain: 1, isActive: 1, startDate: 1, endDate: 1 });
dealOfTheDaySchema.index({ domain: 1, city: 1, isActive: 1 });
dealOfTheDaySchema.index({ domain: 1, pincode: 1, isActive: 1 });

const DealOfTheDay = mongoose.model("DealOfTheDay", dealOfTheDaySchema);

export default DealOfTheDay;
