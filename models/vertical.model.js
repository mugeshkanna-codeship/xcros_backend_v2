import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    siteName: {
      type: String,
    },
    siteTagline: {
      type: String,
    },
    projectSlogan: {
      type: String,
    },
    siteLandingDescription: {
      type: String,
    },
    promoVideoTitle: {
      type: String,
    },
    promoVideoDescription: {
      type: String,
    },
    siteLandingImage: {
      type: String,
    },
    logo: {
      type: String,
    },
    logo2: {
      type: String,
    },
    favicon: {
      type: String,
    },
    promoVideo: {
      type: String,
    },
    primaryColor: {
      type: String,
    },
    secondaryColor: {
      type: String,
    },
    tertiaryColor: {
      type: String,
    },
    sectionPrimaryColor: {
      type: String,
    },
    sectionSecondaryColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
    mapOpacity: {
      type: Number,
    },
    waveOpacity: {
      type: Number,
    },
    stateOrCity: {
      type: String,
    },
    end_date: {
      type: String,
    },
    end_time: {
      type: String,
    },
    counter_image: {
      type: String,
    },
    promovideo_image: {
      type: String,
    },
    contactus_image: {
      type: String,
    },
    directory_mainBanner: {
      type: String,
    },
    directory_banner_type: {
      type: String,
    },
    directory_promoVideo: {
      type: String,
    },
    directory_promoTitle: {
      type: String,
    },
    directory_promoDescription: {
      type: String,
    },
    directory_promobackground: {
      type: String,
    },
    directory_banner: {
      type: String,
    },
    directory_tagline: {
      type: String,
    },
    directory_projectSlogan: {
      type: String,
    },
    directory_title: {
      type: String,
    },
    directory_ref_url: {
      type: String,
    },
    sponser_ref_url1: {
      type: String,
    },
    sponser_ref_url2: {
      type: String,
    },
    sponser_ref_url3: {
      type: String,
    },
    sponser_bg1: {
      type: String,
    },
    sponser_bg2: {
      type: String,
    },
    sponser_bg3: {
      type: String,
    },
    sponser_overlay1: {
      type: String,
    },
    sponser_overlay2: {
      type: String,
    },
    sponser_overlay3: {
      type: String,
    },
    projectagent_name: {
      type: String,
    },
    projectagent_image: {
      type: String,
    },
    projectagent_logo_image: {
      type: String,
    },
    projectagent_email: {
      type: String,
    },
    projectagent_mobile: {
      type: String,
    },
    projectagent_address: {
      type: String,
    },
    projectagent_description: {
      type: String,
    },
    projectagent_page_counter: {
      type: Number,
      default: 0,
    },
    projectagent_description_image: {
      type: String,
    },
    projectLink_facebook: {
      type: String,
    },
    projectLink_twitter: {
      type: String,
    },
    projectLink_instagram: {
      type: String,
    },
    projectLink_youtube: {
      type: String,
    },
    projectLink_whatsapp: {
      type: String,
    },
    quoteImage: {
      type: String,
    },
    quote: {
      type: String,
    },
    didYoouKnowImage: {
      type: String,
    },
    didYouKnowQuote: {
      type: String,
    },
    youShouldKnowImage: {
      type: String,
    },
    youShouldKnowQuote: {
      type: String,
    },
    communityVideo: {
      type: String,
    },
    businessVideo: {
      type: String,
    },
    externalLinks: {
      type: Array,
    },
    industry_name: {
      type: String,
    },
    category_name: {
      type: String,
    },
    page_not_found_image: {
      type: String,
    },
    helpcenter_banner_image: {
      type: String,
    },
    contact_us_banner_image: {
      type: String,
    },
    contact_us_customer_image: {
      type: String,
    },
    team_banner_image: {
      type: String,
    },
    category_directory_banner: {
      type: String,
    },
    locationDirectoryBanner: {
      type: String,
    },
    markets_banner_image: {
      type: String,
    },
    social_banner_image: {
      type: String,
    },
    //about
    about_description: {
      type: String,
    },
    about_features: {
      type: Array,
    },
    about_photo: {
      type: Array,
    },
    about_video: {
      type: Array,
    },
    about_updates: {
      type: Array,
    },
    publish_date: {
      type: String,
    },
    compatible_browser: {
      type: String,
    },
    compatible_resolutions: {
      type: String,
    },
    service_provider: {
      type: Array,
    },
    //
    markets: {
      type: Array,
    },
    // Services offered under this vertical
    services: [
      {
        name: { type: String },
        category: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],
    // Partners for this vertical
    partners: [
      {
        name: { type: String },
        category: { type: String },
        description: { type: String },
        image: { type: String },
        url: { type: String },
      },
    ],
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vertical = mongoose.model("Vertical", schema);

export default Vertical;
