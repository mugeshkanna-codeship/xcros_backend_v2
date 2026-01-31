import mongoose from "mongoose";
import { convert } from "url-slug";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Country"
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Launching', 'Coming Soon'],
      default: 'Active',
    },
    launched: {
      type: Boolean,
      default: false,
    },
    launchedDate: {
      type: Date,
      default: null,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      default:[null]
    },
    uid: {
      type: String,
    },
    image: {
      type: String,
    },
    unionTerritory: {
      type: Boolean,
      default: false,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug if name is provided and slug is not set
schema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = convert(this.name, { camelCase: false });
  }
  next();
});

const State = mongoose.model("State", schema, "states");

export default State;
