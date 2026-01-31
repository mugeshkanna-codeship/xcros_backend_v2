import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Launching', 'Coming Soon'],
      default: 'Active',
    },
    launchDate: {
      type: Date,
      default: null,
    },
    launched: {
      type: Boolean,
      default: false,
    },
    // Added for explicit launched date tracking (kept separate from legacy launchDate)
    launchedDate: {
      type: Date,
      default: null,
    },
    active: {
      type: String,
    },
    tags: {
      type: [ mongoose.Schema.Types.ObjectId ],
      ref:"Tag"
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    url: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", schema , "countries");

export default Country;