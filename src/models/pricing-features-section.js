'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PricingFeaturesSection extends Model {
    static associate(models) {
      PricingFeaturesSection.belongsTo(models.Pricing, { foreignKey: 'pricingId', as: 'pricing' });
      PricingFeaturesSection.hasMany(models.PricingFeature, { foreignKey: 'pricingFeaturesSectionId', as: 'features' });
    }
  }
  PricingFeaturesSection.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pricingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pricings',
        key: 'id'
      }
    },
    mainHeading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subHeading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PricingFeaturesSection',
    timestamps: true
  });
  return PricingFeaturesSection;
};