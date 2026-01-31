import mongoose from "mongoose";

const serviceMarketplaceSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    primaryCategories: [
      {
        categoryType: {
          type: String,
          required: true,
        },
        category_subscription_type: {
          type: String,
          enum: ["paid", "free", "now"],
          required: true,
        },
        boxes: [
          {
            categoryName: {
              type: String,
              required: true,
            },
            description: {
              type: String,
            },
            category_subscription_type: {
              type: String,
              enum: ["paid", "free", "now"],
              required: true,
            },
            icon: {
              type: String,
            },
            image: {
              type: String,
            },
            slug: {
              type: String,
            },
            featured: {
              type: String,
              enum: ["yes", "no"],
              default: "no",
            },
            active: {
              type: String,
              default: "yes",
            },
          },
        ],
      },
    ],
    active: {
      type: String,
      default: "yes",
    },
    slug: {
      type: String,
    },
    uid: {
      type: String,
    },
  },
  { timestamps: true }
);

const ServiceMarketplace = mongoose.model(
  "ServiceMarketplace",
  serviceMarketplaceSchema,
  "service_marketplace"
);

export default ServiceMarketplace;
