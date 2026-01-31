import mongoose from "mongoose";
import { convert } from "url-slug";

const schema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Country",
      default:null
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"State",
      default:null
       //type:String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
      default: "Regular",
    },
    image: {
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
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    uid: {
      type: String,
    },
    metrocity: {
      type: Boolean,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    pinterest: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug if name is provided and slug is not set
schema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = convert(this.name, { camelCase: false });
  }
  // Set location coordinates
  if (this.latitude && this.longitude) {
    this.location.coordinates = [this.longitude, this.latitude];
  }
  next();
});

const City = mongoose.model("City", schema, "cities");

// Create 2dsphere index for geospatial queries
City.collection.createIndex({ location: "2dsphere" });

export default City;
