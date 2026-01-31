import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // Section 1: Hero/Main Section
    section1: {
      mainHeading: {
        type: String,
      },
      greyHeading: {
        type: String,
      },
      subHeading: {
        type: String,
      },
      image: {
        type: String,
      },
    },

    // Section 2 (Service section with dropdowns)
    section2: {
      mainHeading: {
        type: String,
      },
      // Dropdowns represent the selectable items in the UI (About service, Specifications, Benefits, etc.)
      dropdowns: [
        {
          // A label shown in dropdown (e.g., "About service")
          label: String,
          // A machine key (optional) to identify the dropdown (e.g., "about_service", "faq", "terms")
          key: String,
          // Type helps frontend interpret available fields
          type: {
            type: String,
            enum: [
              "service",
              "specifications",
              "benefits",
              "features",
              "requirements",
              "gallery",
              "faq",
              "terms",
              "other",
            ],
            default: "other",
          },

          // For 'service' type: an array where each entry can have images and a description
          services: [
            {
              title: String,
              description: String,
              images: [String],
            },
          ],

          // For 'gallery' type: images, videos and 360 views
          gallery: {
            images: [String],
            videos: [String],
            views360: [String],
          },

          // For 'faq' and 'terms' types: question-answer arrays
          faqs: [
            {
              question: String,
              answer: String,
            },
          ],

          terms: [
            {
              question: String,
              answer: String,
            },
          ],

          // Generic content for any dropdown
          content: String,
        },
      ],
    },

    // Section 3 (Features list)
    section3: {
      mainHeading: {
        type: String,
      },
      subHeading: {
        type: String,
      },
      // Simple array of feature texts
      features: [String],
      // Optional content block
      content: {
        type: String,
      },
    },

    // Section 4 (Slider)
    section4: {
      mainHeading: {
        type: String,
      },
      subHeading: {
        type: String,
      },
      // slider items shown in the carousel: image + text
      slider: [
        {
          image: String,
          title: String,
          description: String,
     
        },
      ],
    },

    // Section 5 (About Us with dropdowns)
    section5: {
      mainHeading: {
        type: String,
      },
      // Short description for the section
      description: {
        type: String,
      },
      // Big hero image
      heroImage: {
        type: String,
      },
      // Small supporting image
      smallImage: {
        type: String,
      },
      // Video URL (embed or direct link)
      video: {
        type: String,
      },
      // Dropdowns for About Us section: about us, why choose us, how we work, about vendor
      dropdowns: [
        {
          label: String,
          key: String,
          type: {
            type: String,
            enum: ["about_us", "why_choose_us", "how_we_work", "about_vendor", "other"],
            default: "other",
          },
          // Rich content or text for each dropdown option
          
        },
      ],
    },

    // Section 6 (Stats: 4 items each with image, stat value, title and text)
    section6: {
      mainHeading: {
        type: String,
      },
      // Array of stat items (frontend expects up to 4 items)
      stats: [
        {
          image: String,
          // numeric or text value e.g. "100+"
          value: String,
          // short title/label for the stat
          title: String,
          // supplemental text or description
          text: String,
        },
      ],
    },


    page_type: {
      type: String,
      enum: ["partner pricing", "services pricing"],
      default: "services pricing",
    },

    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },

    domain: {
      type: String,
    },

    placement: {
      type: String,
      enum: [
        "Listing Profile",
        "Online store",
        "Hyperlocal Delivery",
        "Influencer marketing",
        "Sales & Marketing",
        "Advertise with us",
        "Be our member",
        "Network agency",
        "Social investor",
        "Delivery partner",
        "Marketing Agent",
        "Influencer",
        "Affiliate"
      ],
    },
  },
  { timestamps: true }
);

const Pricing = mongoose.model("Pricing", schema);

export default Pricing;
