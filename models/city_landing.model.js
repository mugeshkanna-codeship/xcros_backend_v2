import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    listing_view_counter: {
      type: Number,
      default: 0,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
     city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      default: "Regular", // or Metro
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    description: {
      type: String,
    },
    active: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    uid: {
      type: String,
    },
    ContactAddress: {
      type: Array,
    },
    ContactMail: {
      type: String,
    },
    ContactPhone: {
      type: Array,
    },
    ContactTollNo: {
      type: Array,
    },
    ContactWebsite: {
      type: String,
    },
    agentHostedPlaces: {
      type: String,
    },
    agentName: {
      type: String,
    },
    agentProfilePicture: {
      type: String,
    },
    almanacCity: {
      type: String,
    },
    almanacCordinates: {
      type: String,
    },
    almanacCountry: {
      type: String,
    },
    almanacDensity: {
      type: String,
    },
    almanacIncorporated: {
      type: String,
    },
    almanacLandSize: {
      type: String,
    },
    almanacPincode: {
      type: String,
    },
    almanacPopulation: {
      type: String,
    },
    almanacState: {
      type: String,
    },
    almanacWebsite: {
      type: String,
    },
    banner: {
      type: Array,
    },
    businessContent: {
      type: String,
    },
    businessVideo: {
      type: String,
    },
    communityContent: {
      type: String,
    },
    communityVideo: {
      type: String,
    },
    dailyInspirationQuote: {
      type: String,
    },
    dailyInspirationQuoteImage: {
      type: String,
    },
    flashHeading: {
      type: String,
    },
    flashImage1: {
      type: String,
    },
    flashImage1Description: {
      type: String,
    },
    flashImage2: {
      type: String,
    },
    flashImage2Description: {
      type: String,
    },
    flashImage3: {
      type: String,
    },
    flashImage3Description: {
      type: String,
    },
    flashImage4: {
      type: String,
    },
    flashImage4Description: {
      type: String,
    },
    flashSubHeading: {
      type: String,
    },
    funFactContent: {
      type: String,
    },
    gallery: {
      type: Array,
    },
    headlines: {
      type: Array,
    },
    liveStreaming: {
      type: Array,
    },
    locationDetailsCountrySize: {
      type: String,
    },
    locationDetailsHouseholds: {
      type: String,
    },
    locationDetailsMedian: {
      type: String,
    },
    motions: {
      type: Array,
    },
    newsletterDate: {
      type: String,
    },
    newsletterDownloads: {
      type: String,
    },
    stills: {
      type: Array,
    },
    welcomePara: {
      type: String,
    },
    whoWeArePara: {
      type: String,
    },
    pinterest: {
      type: String,
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
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    is_agent: {
      type: Boolean,
      default: false,
    },
    end_date: {
      type: String,
    },
    end_time: {
      type: String,
    },
    bg_launching_soon: {
      type: String,
    },
    pincodeHits: {
      type: Number,
      default: 0,
    },
    invited: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CityLanding = mongoose.model("CityLanding", schema, "cities");
export default CityLanding;
