import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending Approval",
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
    banner: {
      type: Array,
    },
    locationVideo: {
      type: String,
    },
    aboutLocation: {
      type: String,
    },
    almanacPopulation: {
      type: String,
    },
    almanacPopulationDensity: {
      type: String,
    },
    countryCapital: {
      type: String,
    },
    stateCapital: {
      type: String,
    },
    almanacArea: {
      type: String,
    },
    almanacFormation: {
      type: String,
    },
    fact_incorporated: {
      type: String,
    },
    fact_language: {
      type: String,
    },
    fact_website: {
      type: String,
    },
    funFacts: {
      type: Array,
    },
    gallery: {
      type: Array,
    },
    locationDetailsHouseholds: {
      type: String,
    },
    locationDetailsMedian: {
      type: String,
    },
    locationDetailsCountrySize: {
      type: String,
    },
    stills: {
      type: Array,
    },
    motions: {
      type: Array,
    },
    liveStreaming: {
      type: Array,
    },
    helpline: {
      type: Array,
    },
    locationHighlights: {
      type: Array,
    },
    PromotedProductslider: {
      type: Array,
    },
    view_guide_bg: {
      type: String,
    },
  },
  { timestamps: true }
);

const CityCodeInfo = mongoose.model("CityCodeInfo", schema);

export default CityCodeInfo;
