import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
      index: true,
    },
    firstName: String,
    secondName: String,
    email: String,
    phone: Number,
    address: String,
    websiteUrl: String,
    notes: String,
    avatar: Array,
    facebookUrl: String,
    twitterUrl: String,
    vkontakteUrl: String,
    instagramUrl: String,
    domain: {
      type: String,
      index: true,
    }, // indexed for multi-tenancy
  },
  { timestamps: true }
);

schema.virtual("id").get(function () {
  return this._id.toHexString();
});

schema.set("toJSON", { virtuals: true });


// Compound index for userId and domain (if needed for multi-tenancy)
schema.index({ userId: 1, domain: 1 }, { unique: true });

const Profiledashboard = mongoose.model("ProfileDashboard", schema, "profileDashboard");

export default Profiledashboard;
