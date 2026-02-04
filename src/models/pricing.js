'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Pricing extends Model {
    static associate(models) {
      // Pricing pages can be associated with specific placements or verticals
    }
  }
  Pricing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    section1: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Hero section: mainHeading, greyHeading, subHeading, image'
    },
    section2: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Service section with dropdowns: mainHeading, dropdowns array with services, gallery, faqs, terms'
    },
    section3: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Features section: mainHeading, subHeading, features array, content'
    },
    section4: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Slider section: mainHeading, subHeading, slider array with images'
    },
    section5: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'About Us section: mainHeading, description, heroImage, smallImage, video, dropdowns'
    },
    section6: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Stats section: mainHeading, stats array with image, value, title, text'
    },
    pageType: {
      type: DataTypes.ENUM('partner pricing', 'services pricing'),
      defaultValue: 'services pricing'
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    },
    domain: DataTypes.STRING,
    placement: {
      type: DataTypes.ENUM(
        'Listing Profile',
        'Online store',
        'Hyperlocal Delivery',
        'Influencer marketing',
        'Sales & Marketing',
        'Advertise with us',
        'Be our member',
        'Network agency',
        'Social investor',
        'Delivery partner',
        'Marketing Agent',
        'Influencer',
        'Affiliate',
        "sell with us"
      )
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Pricing',
    tableName: 'pricings',
    underscored: true,
    timestamps: true,
    indexes: [
      { fields: ['page_type'] },
      { fields: ['status'] },
      { fields: ['domain'] },
      { fields: ['placement'] },
      { fields: ['slug'] }
    ],
    hooks: {
      beforeCreate: (pricing) => {
        if (pricing.placement && !pricing.slug) {
          pricing.slug = pricing.placement.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
      },
      beforeUpdate: (pricing) => {
        if (pricing.placement && !pricing.slug) {
          pricing.slug = pricing.placement.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
      }
    }
  });
  return Pricing;
};
