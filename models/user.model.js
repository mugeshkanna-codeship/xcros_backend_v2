import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    role: {
      type: String,
      enum: ["SUPERADMIN", "ADMIN", "USER", "AGENT"],
      default: "USER",
    },
    profile_image: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    address_updated: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      default: null
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      default: null
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null
    },
    pincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincodes",
      default: null
    },
    package_name: {
      type: String,
    },
    validity: {
      type: Number,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null
    },
    start_date: {
      type: String,
    },
    expiry: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending Approval",
    },
    otp: {
      type: Number,
    },
    aboutMe: {
      type: String,
    },
    address1Primary: {
      type: String,
    },
    address1Secondary: {
      type: String,
    },
    badges: {
      type: Array,
    },
    billingCountryPrimary: {
      type: String,
    },
    billingCountrySecondary: {
      type: String,
    },
    billingEmailPrimary: {
      type: String,
    },
    billingEmailSecondary: {
      type: String,
    },
    billingPhonePrimary: {
      type: String,
    },
    billingPhoneSecondary: {
      type: String,
    },
    billingStatePrimary: {
      type: String,
    },
    billingStateSecondary: {
      type: String,
    },
    birthPlace: {
      type: String,
    },
    birthday: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    books: {
      type: String,
    },
    cityPrimary: {
      type: String,
    },
    citySecondary: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyPrimary: {
      type: String,
    },
    companySecondary: {
      type: String,
    },
    firstNamePrimary: {
      type: String,
    },
    firstNameSecondary: {
      type: String,
    },
    games: {
      type: String,
    },
    gender: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    joinedDate: {
      type: String,
    },
    lastNamePrimary: {
      type: String,
    },
    lastNameSecondary: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    movies: {
      type: String,
    },
    musicArtist: {
      type: String,
    },
    occupation: {
      type: String,
    },
    otherInterest: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    postcodePrimary: {
      type: String,
    },
    postcodeSecondary: {
      type: String,
    },
    private: {
      type: String,
    },
    socialNetwork: {
      type: Array,
    },
    tvShow: {
      type: String,
    },
    visible: {
      type: String,
    },
    website: {
      type: String,
    },
    writers: {
      type: String,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    agent_description: {
      type: String,
    },
    agent_description_image: {
      type: String,
    },
    agent_logo_image: {
      type: String,
    },
    agent_profile_views: {
      type: Number,
      default: 0,
    },
    agent_audio_file: {
      type: String,
    },
    image: {
      type: String,
    },
    user_dashboard_img: {
      type: String,
    },
    show_in_city: {
      type: Boolean,
      default: false,
    },
    show_in_pincode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema, "users");

export default User;
