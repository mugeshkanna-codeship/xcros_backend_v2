'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingServiceDropdown extends Model {
    static associate(models) {
      PricingServiceDropdown.belongsTo(models.PricingService, { foreignKey: 'pricingServiceId', as: 'service' });
    }
  }
  PricingServiceDropdown.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingServiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PricingServices',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(
        'service',
        'specifications',
        'benefits',
        'features',
        'requirements',
        'gallery',
        'faq',
        'terms',
        'other'
      ),
      defaultValue: 'other',
      allowNull: false
    },
    services: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of {title, description, images}'
    },
    gallery: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: '{images: [], videos: [], views360: []}'
    },
    faqs: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of {question, answer}'
    },
    terms: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of {question, answer}'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingServiceDropdown',
    timestamps: true
  });
  return PricingServiceDropdown;
};