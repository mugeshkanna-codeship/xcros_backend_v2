'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Pricing extends Model {
    static associate(models) {
      Pricing.hasOne(models.PricingHero, { foreignKey: 'pricingId', as: 'hero' });
      Pricing.hasOne(models.PricingService, { foreignKey: 'pricingId', as: 'service' });
      Pricing.hasOne(models.PricingFeaturesSection, { foreignKey: 'pricingId', as: 'featuresSection' });
      Pricing.hasOne(models.PricingSliderSection, { foreignKey: 'pricingId', as: 'sliderSection' });
      Pricing.hasOne(models.PricingAbout, { foreignKey: 'pricingId', as: 'about' });
      Pricing.hasOne(models.PricingStatsSection, { foreignKey: 'pricingId', as: 'statsSection' });
    }
  }
  Pricing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pageType: {
      type: DataTypes.ENUM('partner pricing', 'services pricing'),
      defaultValue: 'services pricing',
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active',
      allowNull: false
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
        'sell with us'
      ),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
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
