import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    relatedMainCategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    relatedPrimaryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryCategory",
    },
    relatedSecondaryCategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecondaryCategory",
    },
    relatedTertiaryCategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TertiaryCategory",
    },

    //
    listingDataCountry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    listingDataState: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    listingDataCity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    listingDataPincode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pincodes",
    },
    // Field to control if listing should be visible city-wide
    show_in_city: {
      type: Boolean,
      default: false,
    },
    //
    //
    domain: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    productbg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    bottombg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tags",
    },
    benefits: {
      type: Array,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    primary_category: {
      type: String,
    },
    secondary_category: {
      type: String,
    },
    slug: {
      type: String,
    },
    short_description: {
      type: String,
    },

    description: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_keywords: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    type: {
      type: String,
      default: "Simple",
    },
    status: {
      type: Boolean,
    },
    listing_id: {
      type: String,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    AboutPlace: {
      type: String,
    },

    //updated listing items
    announcement: {
      type: Array,
    },
    site_audio: {
      type: String,
    },
    displayImage: {
      type: String,
    },
    BannerImage: {
      type: String,
    },
    BannerText: {
      type: String,
    },

    averagePriceForListings: {
      type: Number,
    },
    Awards: {
      type: [Object],
    },
    Brochure1: {
      type: String,
    },
    Brochure2: {
      type: String,
    },
    Brochure3: {
      type: String,
    },
    CatalogueallHighlightedProducts: {
      type: String,
    },
    Certifications: {
      type: [Object],
    },
    ContactAddress: {
      type: [
        {
          address: String,
        },
      ],
    },
    ContactPhone: {
      type: [
        {
          phone: Number,
        },
      ],
    },
    ContactMail: {
      type: String,
    },
    ContactTollNo: {
      type: [
        {
          tollNo: Number,
        },
      ],
    },
    ContactWebsite: {
      type: String,
    },
    GalleryPhotos: {
      type: [
        {
          image: {
            type: String,
          },
        },
      ],
    },
    Licenses: {
      type: [Object],
    },
    Nearby: {
      type: Array,
    },
    Numberofreviews: {
      type: Number,
    },
    OtherLinksSite: {
      type: [
        {
          link: String,
        },
      ],
    },
    OtherLinksWEB: {
      type: [
        {
          link: String,
        },
      ],
    },
    Placedistance: {
      type: String,
    },
    Placeimage: {
      type: String,
    },
    PromotedListing: {
      type: Array,
    },
    PromotedProductslider: {
      type: Array,
    },
    TypeofPlace: {
      type: String,
    },
    aboutContent: {
      type: String,
    },
    aka_almanac: {
      type: Number,
    },
    allHighlightedProducts: {
      type: Array,
    },
    annualRevenue_almanac: {
      type: String,
    },
    appontments: {
      type: Number,
    },
    bookmarks: {
      type: Number,
    },
    branches_almanac: {
      type: String,
    },
    business_name1: {
      type: String,
    },
    business_name2: {
      type: String,
    },
    business_name3: {
      type: String,
    },
    business_name4: {
      type: String,
    },
    created_almanac: {
      type: String,
    },
    disclaimerAdditionalInfo: {
      type: String,
    },
    employees_almanac: {
      type: String,
    },
    facebookLink: {
      type: String,
    },
    faqAdditionalInfo: {
      type: String,
    },
    featured: {
      type: String,
    },
    founded_almanac: {
      type: String,
    },
    fridayShift1_from: {
      type: String,
    },
    fridayShift1_to: {
      type: String,
    },
    fridayShift2_from: {
      type: String,
    },
    fridayShift2_to: {
      type: String,
    },
    funFactsContent: {
      type: String,
    },
    gstIn: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    linkedInLink: {
      type: String,
    },
    loctionType_almanac: {
      type: String,
    },
    messageContent: {
      type: String,
    },
    messages: {
      type: String,
    },
    mondayShift1_from: {
      type: String,
    },
    mondayShift1_to: {
      type: String,
    },
    mondayShift2_from: {
      type: String,
    },
    mondayShift2_to: {
      type: String,
    },
    orders: {
      type: Number,
    },
    owner: {
      type: String,
    },
    pinterestLink: {
      type: String,
    },
    qrCodeForProducts: {
      type: String,
    },
    qrCodeImageOverview: {
      type: String,
    },
    qrImage1: {
      type: String,
    },
    qrImage2: {
      type: String,
    },
    qrImage3: {
      type: String,
    },
    qrImage4: {
      type: String,
    },
    recommended: {
      type: String,
    },
    relatedCategory: {
      type: String,
    },

    representativeApprovedDate: {
      type: String,
    },
    representativeCreatedDate: {
      type: String,
    },
    representativeHostedPlace: {
      type: String,
    },
    representativeImage: {
      type: String,
    },
    representativeManagedDate: {
      type: String,
    },
    representativeName: {
      type: String,
    },
    representativeStatus: {
      type: String,
    },
    review: {
      type: String,
    },
    saturdayShift1_from: {
      type: String,
    },
    saturdayShift1_to: {
      type: String,
    },
    saturdayShift2_from: {
      type: String,
    },
    saturdayShift2_to: {
      type: String,
    },
    selectedAmenetiesName: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Amentiies",
    },
    selectedBrandTagsName: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    selectedLocationTagsName: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    selectedProductsTagsName: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    selectedServicesTagsName: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    selectedSpecialitiesName: {
      type: [Object],
    },
    service_name1: {
      type: String,
    },
    service_name2: {
      type: String,
    },
    service_name3: {
      type: String,
    },
    service_name4: {
      type: String,
    },
    slider: {
      type: Array,
    },
    statisticsAppointmentBooking: {
      type: Number,
    },
    statisticsBookmarks: {
      type: Number,
    },
    statisticsGalleryItems: {
      type: Number,
    },
    statisticsMessages: {
      type: Number,
    },
    statisticsProductBooking: {
      type: Number,
    },
    statisticsReviews: {
      type: Number,
    },
    statisticsSubscribers: {
      type: Number,
    },
    statisticsViews: {
      type: Number,
    },
    sundayShift1_from: {
      type: String,
    },
    sundayShift1_to: {
      type: String,
    },
    sundayShift2_from: {
      type: String,
    },
    sundayShift2_to: {
      type: String,
    },
    tcAdditionalInfo: {
      type: String,
    },
    team: {
      type: Array,
    },
    thursdayShift1_from: {
      type: String,
    },
    thursdayShift1_to: {
      type: String,
    },
    thursdayShift2_from: {
      type: String,
    },
    thursdayShift2_to: {
      type: String,
    },
    timelineContent: {
      type: String,
    },
    tuesdayShift1_from: {
      type: String,
    },
    tuesdayShift1_to: {
      type: String,
    },
    tuesdayShift2_from: {
      type: String,
    },
    tuesdayShift2_to: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    upiBusinessName1: {
      type: String,
    },
    upiBusinessName2: {
      type: String,
    },
    upiBusinessName3: {
      type: String,
    },
    upiBusinessName4: {
      type: String,
    },
    upiId1: {
      type: String,
    },
    upiId2: {
      type: String,
    },
    upiId3: {
      type: String,
    },
    upiId4: {
      type: String,
    },
    verified: {
      type: String,
    },
    verified_almanac: {
      type: String,
    },
    viewed: {
      type: Number,
      default: 0,
    },
    wednesdayShift1_from: {
      type: String,
    },
    wednesdayShift1_to: {
      type: String,
    },
    wednesdayShift2_from: {
      type: String,
    },
    wednesdayShift2_to: {
      type: String,
    },
    whetheropen: {
      type: String,
    },
    yearEstablished: {
      type: String,
    },
    yearIncorporated_almanac: {
      type: String,
    },
    yearUpdated_almanac: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    dislikedReccommended: {
      type: Number,
    },
    likedReccommended: {
      type: Number,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Pending Approval",
    },
    listing_address: {
      type: String,
    },
    Services: {
      type: Array,
    },
    pricingCheap: {
      type: Number,
    },
    pricingEconomical: {
      type: Number,
    },
    pricingModerate: {
      type: Number,
    },
    pricingExpensive: {
      type: Number,
    },
    pricingLuxary: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    moreInfo_content: {
      type: String,
    },
    moreInfo_mission: {
      type: String,
    },
    moreInfo_vision: {
      type: String,
    },
    moreInfo_serve: {
      type: String,
    },
    moreInfo_approach: {
      type: String,
    },
    moreInfo_whatWeDo: {
      type: String,
    },
    keyFacts_projects: {
      type: String,
    },
    funFacts: {
      type: Array,
    },
    timeline: {
      type: Array,
    },
    is_store: {
      type: Boolean,
      default: false,
    },
    service_provided: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "tertiaryCategory",
    },

    //
    price_type: {
      type: String,
    },
    price_range_min: {
      type: Number,
    },
    price_range_max: {
      type: Number,
    },

    //
    discount:{
      type:Number
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", schema, "listings");

export default Listing;
